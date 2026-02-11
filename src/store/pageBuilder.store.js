import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';

// Helper to deep copy content to avoid mutation issues
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));

const usePageBuilderStore = create((set, get) => ({
    // Page Metadata
    title: 'Untitled Page',
    slug: '',
    description: '',
    isPublished: false,

    // Content Tree (Recursive Nodes)
    content: [
        {
            id: uuidv4(),
            type: 'div',
            styles: {
                padding: '20px',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
            },
            properties: {},
            children: [],
        },
    ],

    // History State
    history: [], // Array of past content states
    currentHistoryIndex: -1, // Pointer to current state in history

    // Editor State
    selectedNodeId: null,

    // Actions
    setMetadata: (metadata) => set((state) => ({ ...state, ...metadata })),

    selectNode: (nodeId) => set({ selectedNodeId: nodeId }),

    // Helper to push to history
    pushToHistory: (newContent) => {
        set((state) => {
            const newHistory = state.history.slice(0, state.currentHistoryIndex + 1);
            newHistory.push(deepCopy(newContent));
            return {
                history: newHistory,
                currentHistoryIndex: newHistory.length - 1,
                content: newContent
            };
        });
    },

    // Undo/Redo
    undo: () => {
        set((state) => {
            if (state.currentHistoryIndex > 0) {
                const prevIndex = state.currentHistoryIndex - 1;
                return {
                    currentHistoryIndex: prevIndex,
                    content: deepCopy(state.history[prevIndex])
                };
            }
            return state;
        });
    },

    redo: () => {
        set((state) => {
            if (state.currentHistoryIndex < state.history.length - 1) {
                const nextIndex = state.currentHistoryIndex + 1;
                return {
                    currentHistoryIndex: nextIndex,
                    content: deepCopy(state.history[nextIndex])
                };
            }
            return state;
        });
    },

    updateNode: (nodeId, updates) => {
        const state = get();
        // Save current state to history before strictly modifying if it's a new action
        // Note: For smoother slider dragging we might want to debounce this, but for now simple history push on every action
        // Ideally we push checking if last history state is different.

        // For this implementation, we'll just derive new content and push it.

        const updateRecursive = (nodes) => {
            return nodes.map((node) => {
                if (node.id === nodeId) {
                    const updatedNode = { ...node };
                    if (updates.styles) updatedNode.styles = { ...node.styles, ...updates.styles };
                    if (updates.properties) updatedNode.properties = { ...node.properties, ...updates.properties };
                    if (updates.children) updatedNode.children = updates.children;
                    return updatedNode;
                }
                if (node.children && node.children.length > 0) {
                    return { ...node, children: updateRecursive(node.children) };
                }
                return node;
            });
        };

        const newContent = updateRecursive(state.content);

        // Simple optimization: Push to history only if not just selecting (this function is called for updates)
        // We manually push to history
        get().pushToHistory(newContent);
    },

    addNode: (parentId, newNodeType) => {
        const state = get();
        const newNode = {
            id: uuidv4(),
            type: newNodeType,
            styles: { padding: '10px', margin: '5px' },
            properties: { textContent: newNodeType === 'text' ? 'New Text' : '' },
            children: [],
        };

        const addRecursive = (nodes) => {
            return nodes.map((node) => {
                if (node.id === parentId) {
                    return { ...node, children: [...node.children, newNode] };
                }
                if (node.children && node.children.length > 0) {
                    return { ...node, children: addRecursive(node.children) };
                }
                return node;
            });
        };

        const newContent = addRecursive(state.content);
        get().pushToHistory(newContent);
    },

    deleteNode: (nodeId) => {
        const state = get();

        const deleteRecursive = (nodes) => {
            return nodes.filter(node => node.id !== nodeId).map(node => {
                if (node.children && node.children.length > 0) {
                    return { ...node, children: deleteRecursive(node.children) };
                }
                return node;
            });
        };

        const newContent = deleteRecursive(state.content);
        // If selected node was deleted, deselect it
        if (state.selectedNodeId === nodeId) {
            set({ selectedNodeId: null });
        }

        get().pushToHistory(newContent);
    },

    // Initialize
    loadPage: (pageData) => {
        const content = pageData.content || [];
        set({
            title: pageData.title,
            slug: pageData.slug,
            description: pageData.description,
            isPublished: pageData.isPublished,
            content: content,
            selectedNodeId: null,
            history: [deepCopy(content)],
            currentHistoryIndex: 0
        });
    }

}));

export default usePageBuilderStore;
