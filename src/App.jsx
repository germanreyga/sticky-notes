import { useCallback, useEffect, useState } from "react";
import { MdOutlineEditNote } from "react-icons/md";
import { BiAddToQueue } from "react-icons/bi";
import NotesCluster from "./components/NotesCluster";
import {
    DndContext,
    useSensor,
    useSensors,
    PointerSensor,
} from "@dnd-kit/core";
import { v4 as uuid } from "uuid";
import Note from "./components/Note";
import NoteModel from "./models/NoteModel";
import { getRandColor } from "./helpers/Colors";
import {
    getClustersFromLocalStorage,
    getStickyNotesFromLocalStorage,
    setClustersDataToLocalStorage,
    setStickyNotesDataToLocalStorage,
} from "./helpers/LocalStorage";

const DEFAULT_CLUSTER = "none";

const App = () => {
    const [stickyNotesData, setStickyNotesData] = useState([]);
    const [clustersData, setClustersData] = useState([]);
    const [newClusterName, setNewClusterName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        fetchLocalStorageData();
    }, []);

    const returnNotesFromCluster = (cluster) => {
        return stickyNotesData.filter((note) => note.cluster === cluster);
    };

    const createNewNote = () => {
        const localStorageData = getStickyNotesFromLocalStorage();

        setStickyNotesDataToLocalStorage([
            new NoteModel(uuid(), "", DEFAULT_CLUSTER, getRandColor().hexCode),
            ...localStorageData,
        ]);

        fetchLocalStorageData(); // Refresh list of notes after adding last cluster
    };

    const createNewCluster = () => {
        if (!newClusterName) {
            setErrorMsg("Cluster name cannot be empty...");
            return;
        }

        const localStorageData = getClustersFromLocalStorage();

        if (localStorageData.indexOf(newClusterName) === -1) {
            // Only add to cluster list if it doesn't exist already
            setClustersDataToLocalStorage([
                ...localStorageData,
                newClusterName,
            ]);

            setNewClusterName(""); // Clear the field after adding
            setErrorMsg("");
        } else {
            setErrorMsg("The cluster already exists... Try with another name.");
        }

        fetchLocalStorageData(); // Refresh list of notes after adding last cluster
    };

    const fetchLocalStorageData = () => {
        const snData = getStickyNotesFromLocalStorage();
        if (snData) setStickyNotesData(snData);

        const clustersData = getClustersFromLocalStorage();
        if (clustersData) setClustersData(clustersData);
    };

    const handleOnDragEnd = useCallback(
        ({ active, over }) => {
            const elementId = active.id;
            const deepCopy = [...stickyNotesData];

            const updatedData = deepCopy.map((element) => {
                if (element.id === elementId) {
                    const cluster = over?.id
                        ? String(over.id)
                        : element.cluster;
                    return { ...element, cluster };
                }
                return element;
            });

            setStickyNotesData(updatedData);

            setStickyNotesDataToLocalStorage(updatedData);
        },
        [stickyNotesData, setStickyNotesData]
    );

    const customSensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 8,
            },
        })
    );

    return (
        <>
            <div className="tools">
                <div>
                    <span>Add new Note: </span>
                    <button className="create-new-note" onClick={createNewNote}>
                        <MdOutlineEditNote size="100%" />
                    </button>
                </div>
                <div>
                    <input
                        className="create-new-cluster"
                        placeholder="Create new cluster"
                        value={newClusterName}
                        onChange={(e) => setNewClusterName(e.target.value)}
                    />
                    <button onClick={() => createNewCluster()}>
                        <BiAddToQueue size="70%" />
                    </button>
                    {errorMsg && (
                        <span className="cluster-error">{errorMsg}</span>
                    )}
                </div>
            </div>
            <DndContext onDragEnd={handleOnDragEnd} sensors={customSensors}>
                <div className="cluster-list">
                    {clustersData.map((cluster) => (
                        <NotesCluster
                            key={`${cluster}`}
                            clusterName={cluster}
                            isDefaultCluster={
                                cluster === DEFAULT_CLUSTER ? true : false
                            }
                        >
                            {returnNotesFromCluster(cluster).map((note) => (
                                <Note
                                    key={note.id}
                                    text={note.text}
                                    id={note.id}
                                    colorHex={note.color}
                                    onNoteEdit={fetchLocalStorageData}
                                />
                            ))}
                        </NotesCluster>
                    ))}
                </div>
            </DndContext>
        </>
    );
};

export default App;
