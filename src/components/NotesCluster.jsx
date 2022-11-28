import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

const NotesCluster = ({ clusterName, children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: clusterName,
    });

    const style = useMemo(
        () => ({
            opacity: isOver ? 0.5 : 1,
        }),
        [isOver]
    );

    return (
        <div className="notes-cluster" ref={setNodeRef} style={style}>
            <span>{clusterName}</span>
            {children}
        </div>
    );
};

export default NotesCluster;
