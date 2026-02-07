import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbtack, faRocket, faBrain, faLightbulb, faChartLine, faClose, faPlus, faTrash, faSave, faEdit, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { useStartupStore } from '../store/startup.store';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

import { motion, AnimatePresence } from 'framer-motion';

const StickyNote = ({ note, onUpdate, onDelete, isSelectMode, isSelected, onToggleSelect }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(note.text);

  // We remove local position state to rely on props for the source of truth,
  // preventing "jump back" issues when parent re-renders before local state updates.
  // However, for smooth dragging, we need a ref to track immediate delta.
  const [dragPosition, setDragPosition] = useState({ top: note.top, left: note.left });

  const noteRef = useRef(null);
  const dragStart = useRef({ x: 0, y: 0 });

  // Sync text when prop changes (outside edit mode)
  useEffect(() => {
    if (!isEditing) setText(note.text);
  }, [note.text, isEditing]);

  // Sync position when prop changes (if not dragging)
  useEffect(() => {
    if (!isDragging) {
      setDragPosition({ top: note.top, left: note.left });
    }
  }, [note.top, note.left, isDragging]);


  const handleMouseDown = (e) => {
    if (isEditing || isSelectMode) return; // Disable drag in select mode
    setIsDragging(true);

    // Calculate offset from the note's top-left corner
    const rect = noteRef.current.getBoundingClientRect();
    dragStart.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const parentRect = noteRef.current.offsetParent.getBoundingClientRect();

    // Calculate new position relative to parent
    let newLeft = e.clientX - parentRect.left - dragStart.current.x;
    let newTop = e.clientY - parentRect.top - dragStart.current.y;

    // Optional: Boundary checks could go here

    setDragPosition({ left: newLeft + 'px', top: newTop + 'px' });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Persist the final drag position
      onUpdate(note._id, { top: dragPosition.top, left: dragPosition.left });
    }
  };

  // Attach global mouse listeners when dragging
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleSaveText = () => {
    setIsEditing(false);
    if (text !== note.text) {
      onUpdate(note._id, { text });
    }
  };

  // Creating a "hand-cut" paper look for 'organic' shapes
  const clipStyle = note.shape === 'organic'
    ? { clipPath: 'polygon(0% 2%, 98% 0%, 100% 95%, 4% 100%)' }
    : {};

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'faRocket': return faRocket;
      case 'faBrain': return faBrain;
      case 'faChartLine': return faChartLine;
      default: return faLightbulb;
    }
  }

  // Handle click for selection
  const handleClick = (e) => {
    if (isSelectMode) {
      e.stopPropagation();
      onToggleSelect(note._id);
    }
  }

  return (
    <motion.div
      layout // Smooth layout changes
      initial={{ scale: 0, opacity: 0, rotate: 0 }}
      animate={{ scale: isSelected ? 1.05 : 1, opacity: 1, rotate: parseFloat(note.rotate) }}
      exit={{ scale: 0, opacity: 0 }}
      whileHover={{ scale: isDragging ? 1.05 : 1.02, zIndex: 100 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      ref={noteRef}
      onMouseDown={handleMouseDown}
      onClick={handleClick}
      className={`absolute w-48 h-48 p-5 shadow-2xl transition-shadow group
        ${isDragging ? 'z-50 cursor-grabbing shadow-3xl' : ''}
        ${!isSelectMode && !isDragging ? 'cursor-grab' : ''}
        ${isSelectMode ? 'cursor-pointer' : ''}
        ${isSelected ? 'ring-4 ring-blue-500 z-40' : ''}
      `}
      style={{
        top: dragPosition.top,
        left: dragPosition.left,
        backgroundColor: note.color,
        // Rotation is handled by animate prop
        ...clipStyle
      }}
    >
      {/* Red Thumbtack */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring' }}
        className="absolute -top-4 left-1/2 -translate-x-1/2 text-red-600 drop-shadow-md brightness-90 group-hover:brightness-110 z-10"
      >
        <FontAwesomeIcon icon={faThumbtack} size="xl" />
      </motion.div>

      {/* Checkbox for Select Mode */}
      {isSelectMode && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-2 -right-2 z-50 text-blue-600 bg-white rounded-full"
        >
          <FontAwesomeIcon icon={isSelected ? faCheckSquare : faSquare} size="xl" />
        </motion.div>
      )}

      {/* Action Buttons (Hidden in select mode) */}
      {!isSelectMode && (
        <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <button
            onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
            className="text-black/20 hover:text-blue-600 transition-colors"
            title="Edit"
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(note._id); }}
            className="text-black/20 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      )}

      <div className="flex flex-col h-full justify-between relative z-0">
        <div className="flex justify-between items-start">
          <FontAwesomeIcon icon={getIcon(note.icon)} className="text-black/20 text-xl" />
          <span className="text-[10px] font-bold text-black/30 bg-black/5 px-1 rounded">
            {dayjs(note.updatedAt || new Date()).format('MMM D')}
          </span>
        </div>

        {isEditing ? (
          <textarea
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onBlur={handleSaveText}
            onMouseDown={(e) => e.stopPropagation()}
            className="w-full h-24 bg-transparent resize-none outline-none font-handwriting text-xl text-gray-800 leading-tight"
            placeholder="Type your idea..."
          />
        ) : (
          <p
            onDoubleClick={() => !isSelectMode && setIsEditing(true)}
            className="font-handwriting text-xl text-gray-800 leading-tight select-none h-24 overflow-hidden"
          >
            {text}
          </p>
        )}

        <div className="border-t border-black/5 pt-1 text-[10px] uppercase font-bold text-black/30 flex justify-between items-center">
          <span>{dayjs(note.updatedAt).fromNow()}</span>
          {isEditing && <FontAwesomeIcon icon={faSave} className="text-black/40" />}
        </div>
      </div>

      {/* Subtle paper texture/gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none"></div>
    </motion.div>
  );
};

export default function Notes({ onClose }) {
  const { myStartup, addNote, updateNote, deleteNote, deleteManyNotes } = useStartupStore();
  const startupId = myStartup?._id;

  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState(new Set());

  const handleAddNote = async () => {
    if (!startupId) return;

    // Randomize initial properties
    const colors = ["#fef08a", "#bfdbfe", "#bbf7d0", "#fecaca", "#ddd6fe", "#fed7aa"];
    const icons = ['faRocket', 'faBrain', 'faLightbulb', 'faChartLine'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
    const randomRotate = `${Math.floor(Math.random() * 10 - 5)}deg`; // -5 to 5 deg

    // Intelligent Placement to avoid overlap
    const generatePosition = () => {
      const maxRetries = 10;
      const noteWidth = 15; // Rough % width
      const noteHeight = 20; // Rough % height

      for (let i = 0; i < maxRetries; i++) {
        const top = Math.floor(Math.random() * (80 - noteHeight)) + 10; // Keep within 10-90%
        const left = Math.floor(Math.random() * (80 - noteWidth)) + 10;

        // Check collision with existing notes
        const collision = myStartup?.notes?.some(note => {
          const noteTop = parseFloat(note.top);
          const noteLeft = parseFloat(note.left);

          // Simple AABB collision check in %
          return (
            top < noteTop + noteHeight &&
            top + noteHeight > noteTop &&
            left < noteLeft + noteWidth &&
            left + noteWidth > noteLeft
          );
        });

        if (!collision) {
          return { top: `${top}%`, left: `${left}%` };
        }
      }

      // Fallback if crowded
      return {
        top: `${Math.floor(Math.random() * 60 + 10)}%`,
        left: `${Math.floor(Math.random() * 60 + 10)}%`
      };
    };

    const { top, left } = generatePosition();

    const newNote = {
      text: "Click to edit...", // Clearer call to action
      color: randomColor,
      top,
      left,
      rotate: randomRotate,
      shape: Math.random() > 0.5 ? 'organic' : 'square',
      icon: randomIcon
    };

    const res = await addNote(startupId, newNote);
    if (!res.success) toast.error("Failed to add note");
  };

  const handleUpdateNote = async (noteId, updateData) => {
    const res = await updateNote(startupId, noteId, updateData);
    if (!res.success) toast.error("Failed to update note");
  };

  const handleDeleteNote = async (noteId) => {
    const confirm = window.confirm("Delete this note?");
    if (confirm) {
      const res = await deleteNote(startupId, noteId);
      if (!res.success) toast.error("Failed to delete note");
    }
  };

  const toggleSelectNote = (noteId) => {
    const newSelected = new Set(selectedNotes);
    if (newSelected.has(noteId)) {
      newSelected.delete(noteId);
    } else {
      newSelected.add(noteId);
    }
    setSelectedNotes(newSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedNotes.size === 0) return;
    const confirm = window.confirm(`Delete ${selectedNotes.size} selected notes?`);
    if (confirm) {
      const idsToDelete = Array.from(selectedNotes);
      const res = await deleteManyNotes(startupId, idsToDelete);
      if (res.success) {
        setSelectedNotes(new Set());
        setIsSelectMode(false);
        toast.success(`Deleted ${idsToDelete.length} notes`);
      } else {
        toast.error("Failed to delete notes");
      }
    }
  }

  return (
    <div
      className="relative w-full h-full min-h-[500px] overflow-hidden rounded-xl border-amber-900"
    //   style={{ backgroundImage: `url('/your-doodle-image.jpg')`, backgroundSize: 'cover' }}
    >
      {/* Toolbar */}
      <div className="absolute top-4 right-16 z-50 flex gap-2">
        {!isSelectMode && (
          <button
            onClick={handleAddNote}
            className="bg-[#FD7B41] text-white px-4 py-2 rounded-full shadow-lg font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-2"
          >
            <FontAwesomeIcon icon={faPlus} /> Add Note
          </button>
        )}

        {isSelectMode ? (
          <>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedNotes.size === 0}
              className={`px-4 py-2 rounded-full shadow-lg font-bold transition flex items-center gap-2 ${selectedNotes.size > 0 ? 'bg-red-600 text-white hover:brightness-110 active:scale-95' : 'bg-gray-400 text-gray-200 cursor-not-allowed'}`}
            >
              <FontAwesomeIcon icon={faTrash} /> Delete ({selectedNotes.size})
            </button>
            <button
              onClick={() => { setIsSelectMode(false); setSelectedNotes(new Set()); }}
              className="bg-gray-600 text-white px-4 py-2 rounded-full shadow-lg font-bold hover:brightness-110 active:scale-95 transition flex items-center gap-2"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsSelectMode(true)}
            className="bg-white text-blue-600 px-4 py-2 rounded-full shadow-lg font-bold hover:bg-blue-50 active:scale-95 transition flex items-center gap-2 border border-blue-100"
          >
            <FontAwesomeIcon icon={faCheckSquare} /> Select
          </button>
        )}
      </div>

      <button
        onClick={onClose}
        className="
          absolute top-4 right-4
          z-50
          bg-red-600
          h-10 w-10
          rounded-full
          flex items-center justify-center
          shadow-lg
          hover:scale-110 transition
        "
      >
        <FontAwesomeIcon
          icon={faClose}
          className="w-5 h-5 text-white"
        />
      </button>

      {/* High-Contrast Overlay to make notes pop */}
      {/* <div className="absolute inset-0 bg-black/5 pointer-events-none"></div> */}

      <AnimatePresence>
        {myStartup?.notes?.map(note => (
          <StickyNote
            key={note._id}
            note={note}
            onUpdate={handleUpdateNote}
            onDelete={handleDeleteNote}
            isSelectMode={isSelectMode}
            isSelected={selectedNotes.has(note._id)}
            onToggleSelect={toggleSelectNote}
          />
        ))}
      </AnimatePresence>

      {(!myStartup?.notes || myStartup.notes.length === 0) && (
        <div className="absolute inset-0 flex items-center justify-center text-gray-400 pointer-events-none">
          <p className="text-xl font-handwriting text-white">Click "Add Note" to start brainstorming!</p>
        </div>
      )}
    </div>
  );
}