"use client"
import React from 'react'
import { DndContext, useDroppable } from '@dnd-kit/core';

interface DropableProps {
    children: React.ReactNode;
}

export default function Dropable(props: DropableProps) {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };
    return (
        <DndContext>
            <div ref={setNodeRef} style={style}>
                {props.children}
            </div>
        </DndContext>
    )
}
