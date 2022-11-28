import { useMemo } from "react";
import { useDroppable } from "@dnd-kit/core";

const NotesCluster = ({ clusterName, isDefaultCluster, children }) => {
    const { isOver, setNodeRef } = useDroppable({
        id: clusterName,
    });

    const bgColor = isDefaultCluster ? "none" : "rgb(211,211,211,0.75)";
    const bgColorOver = isDefaultCluster ? "none" : "rgb(211,211,211,1)";

    const style = useMemo(
        () => ({
            backgroundColor: isOver ? bgColor : bgColorOver,
        }),
        [isOver, bgColor, bgColorOver]
    );

    return (
        <div className="notes-cluster-wrapper" ref={setNodeRef} style={style}>
            {!isDefaultCluster && (
                <div className="cluster-header">{clusterName}</div>
            )}
            <div className="notes-cluster">{children}</div>
        </div>
    );
};

export default NotesCluster;
