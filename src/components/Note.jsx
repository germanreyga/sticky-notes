import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TiDelete } from "react-icons/ti";
import {
    getStickyNotesFromLocalStorage,
    setStickyNotesDataToLocalStorage,
} from "../helpers/LocalStorage";

// onTextEdit is a function that the component receives and will execute on the handleTextEdit() function
const Note = ({ id, text, colorHex, onNoteEdit }) => {
    const [typedText, setTypedText] = useState(text);
    const [isHovered, setIsHovered] = useState(false);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id,
    });

    const dragabbleStyle = useMemo(() => {
        if (transform) {
            return {
                transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
            };
        }
        return undefined;
    }, [transform]);

    const handleTextEdit = (event) => {
        setTypedText(event.target.value);

        const newStickyNotesData = getStickyNotesFromLocalStorage();

        const noteIndex = newStickyNotesData.findIndex(
            (note) => note.id === id
        );
        newStickyNotesData[noteIndex].text = event.target.value;

        setStickyNotesDataToLocalStorage(newStickyNotesData);

        onNoteEdit && onNoteEdit(); // If function from props exists, then executes it
    };

    const handleNoteDelete = () => {
        const newStickyNotesData = getStickyNotesFromLocalStorage();

        const noteIndex = newStickyNotesData.findIndex(
            (note) => note.id === id
        );

        if (noteIndex > -1) {
            setStickyNotesDataToLocalStorage(
                newStickyNotesData.filter((note) => note.id !== id)
            );
        }

        onNoteEdit && onNoteEdit(); // If function from props exists, then executes it
    };

    return (
        <div
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            className={`note`}
            ref={setNodeRef}
            style={{ ...dragabbleStyle, backgroundColor: colorHex }}
            {...listeners}
            {...attributes}
        >
            <button className="delete-note" onClick={handleNoteDelete}>
                <TiDelete
                    size="3.5em"
                    visibility={isHovered ? "visible" : "hidden"}
                />
            </button>
            <textarea
                type="text"
                placeholder="TYPE YOUR TEXT HERE"
                spellCheck={false}
                value={typedText}
                onChange={(e) => handleTextEdit(e)}
            />
        </div>
    );
};

export default Note;
