import { useCallback, useState } from "react";
import NotesCluster from "./components/NotesCluster";
import { DndContext } from "@dnd-kit/core";
import { v4 as uuid } from "uuid";
import Note from "./components/Note";
import NoteModel from "./models/NoteModel";

const DEFAULT_CLUSTER = "none";
const CLUSTERS = [DEFAULT_CLUSTER, "uno", "dos", "tres"];
const colors = [
    { name: "red", hexCode: "#f7a4a4" },
    { name: "yellow", hexCode: "#fffbc1" },
    { name: "blue", hexCode: "#b8e8fc" },
    { name: "green", hexCode: "#b6e2a1" },
    { name: "purple", hexCode: "#b1afff" },
];

const getRandColor = () => {
    const min = Math.ceil(0);
    const max = Math.floor(colors.length - 1);
    const randIdx = Math.floor(Math.random() * (max - min + 1)) + min;

    return colors[randIdx];
};

const DEFAULT_NOTES = [
    new NoteModel(uuid(), "HOLA", DEFAULT_CLUSTER, getRandColor().hexCode),
    new NoteModel(uuid(), "HOLA", DEFAULT_CLUSTER, getRandColor().hexCode),
    new NoteModel(uuid(), "HOLA", DEFAULT_CLUSTER, getRandColor().hexCode),
    new NoteModel(uuid(), "HOLA", DEFAULT_CLUSTER, getRandColor().hexCode),
    new NoteModel(uuid(), "HOLA", DEFAULT_CLUSTER, getRandColor().hexCode),
];

const App = () => {
    const [data, setData] = useState(DEFAULT_NOTES);

    const handleOnDragEnd = useCallback(
        ({ active, over }) => {
            const elementId = active.id;
            const deepCopy = [...data];

            const updatedState = deepCopy.map((element) => {
                if (element.id === elementId) {
                    const cluster = over?.id
                        ? String(over.id)
                        : element.cluster;
                    return { ...element, cluster };
                }
                return element;
            });

            setData(updatedState);
        },
        [data, setData]
    );

    const returnNotesFromCluster = (cluster) => {
        return data.filter((note) => note.cluster === cluster);
    };

    return (
        <DndContext onDragEnd={handleOnDragEnd}>
            {CLUSTERS.map((cluster) => (
                <NotesCluster key={`${cluster}`} clusterName={cluster}>
                    {returnNotesFromCluster(cluster).map((note) => (
                        <Note
                            key={note.id}
                            text={note.text}
                            id={note.id}
                            colorHex={note.color}
                        />
                    ))}
                </NotesCluster>
            ))}
        </DndContext>
    );
};

export default App;
