import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Flowchart, FlowchartListItem, FlowchartState } from '@/components/flowchart/types';

export const useFlowchartStore = create<FlowchartState>()(
  persist(
    (set, get) => ({
      flowcharts: {},
      currentFlowchartId: null,

      saveFlowchart: (featureId: string, flowchart: Flowchart) => {
        set((state) => ({
          flowcharts: {
            ...state.flowcharts,
            [featureId]: {
              ...state.flowcharts[featureId],
              [flowchart.id]: {
                ...flowchart,
                updatedAt: new Date().toISOString(),
              },
            },
          },
        }));
      },

      loadFlowchart: (featureId: string, flowchartId: string): Flowchart | null => {
        const state = get();
        return state.flowcharts[featureId]?.[flowchartId] || null;
      },

      deleteFlowchart: (featureId: string, flowchartId: string) => {
        set((state) => {
          const featureFlowcharts = { ...state.flowcharts[featureId] };
          delete featureFlowcharts[flowchartId];
          
          return {
            flowcharts: {
              ...state.flowcharts,
              [featureId]: featureFlowcharts,
            },
            currentFlowchartId: state.currentFlowchartId === flowchartId 
              ? null 
              : state.currentFlowchartId,
          };
        });
      },

      getFlowcharts: (featureId: string): FlowchartListItem[] => {
        const state = get();
        const featureFlowcharts = state.flowcharts[featureId] || {};
        
        return Object.values(featureFlowcharts)
          .map((fc) => ({
            id: fc.id,
            name: fc.name,
            updatedAt: fc.updatedAt,
            nodeCount: fc.nodes.length,
          }))
          .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
      },

      setCurrentFlowchart: (flowchartId: string | null) => {
        set({ currentFlowchartId: flowchartId });
      },
    }),
    {
      name: 'beeorder-flowcharts',
    }
  )
);

