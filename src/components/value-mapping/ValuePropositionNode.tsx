'use client';

import { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { ValueProposition } from '@/lib/types';
import { DollarSign, Clock, TrendingUp, ShieldCheck } from 'lucide-react';

interface ValuePropositionNodeProps extends NodeProps {
  data: {
    valueProposition: ValueProposition;
    onSelect?: (valueProposition: ValueProposition) => void;
  };
}

const impactIcons = {
  financial: <DollarSign className="h-3 w-3" />,
  operational: <TrendingUp className="h-3 w-3" />,
  strategic: <Clock className="h-3 w-3" />,
  risk: <ShieldCheck className="h-3 w-3" />,
};

const impactColors = {
  financial: 'bg-green-100 border-green-300 text-green-800',
  operational: 'bg-blue-100 border-blue-300 text-blue-800',
  strategic: 'bg-purple-100 border-purple-300 text-purple-800',
  risk: 'bg-red-100 border-red-300 text-red-800',
};

const ValuePropositionNode = memo(({ data }: ValuePropositionNodeProps) => {
  const { valueProposition, onSelect } = data;
  const { title, impact } = valueProposition;

  return (
    <div 
      className={`px-2 py-1.5 rounded-md shadow-md border ${impactColors[impact]} w-36 text-xs`}
      onClick={() => onSelect?.(valueProposition)}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-400 !w-2 !h-2" />
      
      <div className="flex items-center justify-between mb-0.5">
        <div className="font-medium truncate flex-1 text-xs">{title}</div>
        <div className="ml-1">{impactIcons[impact]}</div>
      </div>
      
      <div className="text-[10px] opacity-80 truncate">
        {valueProposition.timeToValue.replace('-', ' ')}
      </div>
      
      <Handle type="source" position={Position.Bottom} className="!bg-gray-400 !w-2 !h-2" />
    </div>
  );
});

export default ValuePropositionNode;
