import { useMemo, useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { TiDelete } from "react-icons/ti";

const Note = ({ id, text, colorHex }) => {
    const [typedText, setTypedText] = useState(text);
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

    return (
        <div
            className={`note`}
            ref={setNodeRef}
            style={{ ...dragabbleStyle, backgroundColor: colorHex }}
            {...listeners}
            {...attributes}
        >
            <TiDelete className="delete-note" size="1.2em" />
            <span>ID: {id}</span>
            <textarea
                type="text"
                spellCheck={false}
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
            />
        </div>
    );
};

export default Note;
