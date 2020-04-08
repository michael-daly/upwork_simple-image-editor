const setImageNumber      = number => { type: 'SET_IMAGE_NUMBER',      payload: number };
const setImageDescription = desc   => { type: 'SET_IMAGE_DESCRIPTION', payload: desc   };

const setDrawColor   = color => { type: 'SET_DRAW_COLOR',   payload: color };
const setCurrentTool = tool  => { type: 'SET_CURRENT_TOOL', payload: tool  };


export { setImageNumber, setImageDescription, setDrawColor, setCurrentTool };
