import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarAlt,
    faPlus,
    faTrash,
    faCheckCircle,
    faCircle,
    faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import {
    getMyCalendar,
    addToCalendar,
    removeFromCalendar,
    updateTaskStatus,
} from "../../services/calendar.service";
import { toast } from "react-toastify";

const CalendarSection = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().split('T')[0]);

    useEffect(() => {
        fetchCalendar();
    }, []);

    const fetchCalendar = async () => {
        try {
            setLoading(true);
            const res = await getMyCalendar();
            setItems(res?.data?.items || []);
        } catch (error) {
            console.error("Error fetching calendar:", error);
            toast.error("Failed to load calendar");
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e) => {
        e.preventDefault();
        if (!newTaskTitle.trim()) return;

        try {
            const res = await addToCalendar({
                type: "task",
                title: newTaskTitle,
                date: newTaskDate,
                description: "",
            });
            setItems(res?.data?.items || []);
            setNewTaskTitle("");
            toast.success("Task added to calendar");
        } catch (error) {
            console.error("Error adding task:", error);
            toast.error("Failed to add task");
        }
    };

    const handleDelete = async (itemId) => {
        if (!window.confirm("Are you sure you want to delete this item?")) return;
        try {
            const res = await removeFromCalendar(itemId);
            setItems(res?.data?.items || []);
            toast.success("Item removed");
        } catch (error) {
            console.error("Error removing item:", error);
            toast.error("Failed to remove item");
        }
    };

    const handleToggleStatus = async (item) => {
        const newStatus = item.status === "completed" ? "pending" : "completed";
        try {
            await updateTaskStatus(item._id, newStatus);
            // Optimistic update
            setItems((prev) =>
                prev.map((i) => (i._id === item._id ? { ...i, status: newStatus } : i))
            );
        } catch (error) {
            console.error("Error updating status:", error);
            toast.error("Failed to update status");
        }
    };

    const filteredItems = items
        .filter((item) => {
            const itemDate = new Date(item.date).toDateString();
            const selected = new Date(selectedDate).toDateString();
            return itemDate === selected;
        })
        .sort((a, b) => new Date(a.date) - new Date(b.date));

    // Group days with events for calendar highlighting
    const eventDays = items.reduce((acc, item) => {
        const dateStr = new Date(item.date).toDateString();
        acc[dateStr] = (acc[dateStr] || 0) + 1;
        return acc;
    }, {});


    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
                    <FontAwesomeIcon icon={faCalendarAlt} className="text-orange-500" />
                    My Calendar
                </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                {/* Left: Simple Calendar View (Placeholder for now, implementation can be enhanced) */}
                <div className="p-6 lg:border-r border-gray-200 dark:border-gray-700 lg:col-span-2">
                    <div className="mb-4 flex items-center justify-between">
                        <input
                            type="date"
                            value={selectedDate.toISOString().split('T')[0]}
                            onChange={(e) => {
                                const d = new Date(e.target.value);
                                if (!isNaN(d)) setSelectedDate(d);
                            }}
                            className="p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Select a date to view/add tasks
                        </span>
                    </div>

                    {/* Task Input */}
                    <form onSubmit={handleAddTask} className="flex gap-2 mb-6">
                        <input
                            type="text"
                            value={newTaskTitle}
                            onChange={(e) => setNewTaskTitle(e.target.value)}
                            placeholder="Add a new task..."
                            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 outline-none transition"
                        />
                        <input
                            type="date"
                            value={newTaskDate}
                            onChange={(e) => setNewTaskDate(e.target.value)}
                            className="p-2 border rounded-xl dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl transition"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                    </form>

                    {/* List for Selected Date */}
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-4">
                            Schedule for {selectedDate.toDateString()}
                        </h3>

                        {loading ? (
                            <div className="flex justify-center p-8">
                                <FontAwesomeIcon icon={faSpinner} spin className="text-2xl text-orange-500" />
                            </div>
                        ) : filteredItems.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400 italic text-center py-8">
                                No tasks or events for this day.
                            </p>
                        ) : (
                            <ul className="space-y-3">
                                {filteredItems.map(item => (
                                    <li key={item._id} className={`flex items-start gap-3 p-3 rounded-xl border ${item.status === 'completed' ? 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 opacity-70' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 shadow-sm'}`}>
                                        <button
                                            onClick={() => handleToggleStatus(item)}
                                            className={`mt-1 ${item.status === 'completed' ? 'text-green-500' : 'text-gray-300 hover:text-green-500'}`}
                                        >
                                            <FontAwesomeIcon icon={item.status === 'completed' ? faCheckCircle : faCircle} className="text-xl" />
                                        </button>

                                        <div className="flex-1">
                                            <p className={`font-medium ${item.status === 'completed' ? 'line-through text-gray-500' : 'text-gray-800 dark:text-gray-200'}`}>
                                                {item.type === 'event' ? (
                                                    <span className="text-orange-600 dark:text-orange-400 font-bold">[Event] </span>
                                                ) : null}
                                                {item.type === 'event' ? item.description : item.title}
                                            </p>
                                            {item.type === 'event' && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    Saved from event: {item.description}
                                                </p>
                                            )}
                                        </div>

                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="text-gray-400 hover:text-red-500 p-2 transition"
                                        >
                                            <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Right: Summary / Upcoming (Simple List) */}
                <div className="p-6 bg-gray-50 dark:bg-gray-800/50">
                    <h3 className="font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase text-xs tracking-wider">
                        Upcoming Items
                    </h3>
                    <div className="space-y-3 max-h-[500px] overflow-y-auto">
                        {items
                            .filter(i => new Date(i.date) >= new Date() && i.status !== 'completed')
                            .sort((a, b) => new Date(a.date) - new Date(b.date))
                            .slice(0, 5) // Show next 5
                            .map(item => (
                                <div key={item._id} className="text-sm p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
                                    <div className="flex justify-between items-start mb-1">
                                        <span className={`text-xs font-bold px-2 py-0.5 rounded ${item.type === 'event' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {item.type}
                                        </span>
                                        <span className="text-xs text-gray-500 dark:text-gray-400">
                                            {new Date(item.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="font-medium text-gray-800 dark:text-gray-200 truncate">
                                        {item.type === 'event' ? item.description : item.title}
                                    </p>
                                </div>
                            ))
                        }
                        {items.filter(i => new Date(i.date) >= new Date() && i.status !== 'completed').length === 0 && (
                            <p className="text-xs text-gray-500 text-center">No upcoming items.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarSection;
