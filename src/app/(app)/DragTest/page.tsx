"use client"
import React, { useState } from 'react'
import { DndContext } from '@dnd-kit/core';
import Dropable from '../Dropable/page';
import Draggable from '../Dragable/page';

export default function DragTest() {
    const [isDropped, setIsDropped] = useState(false);
    const draggableMarkup = (
        <Draggable >Drag me</Draggable>
    );
    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="bg-white h-screen">
                {!isDropped ? draggableMarkup : null}
                <Dropable>
                    {isDropped ? draggableMarkup : 'Drop here'}
                </Dropable>
            </div>
        </DndContext>

    );
    function handleDragEnd(event) {
        if (event.over && event.over.id === 'droppable') {
            setIsDropped(true);
        }
    }
}
