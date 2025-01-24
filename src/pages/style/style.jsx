import React, { useContext } from 'react';
import { StyleContext } from '../../core/StyleContext';
import { ColorPicker } from 'antd';

export function Style() {
    const { style, handleColorChange } = useContext(StyleContext); 

    return (
        <div className='flex items-center justify-center h-screen bg-white'>
            <div className='flex w-full max-w-4xl'>
                {/* ColorPicker Section */}
                <div className='w-1/2 flex flex-col items-center justify-center p-4'>
                    <h1 className='text-2xl mb-4'>Choose a Color</h1>
                    <ColorPicker 
                        defaultValue="#1677ff" 
                        onChange={handleColorChange} // Usa la función global para actualizar los colores
                        className='mb-4'
                    />
                </div>

                {/* Preview Section */}
                <div className='w-1/2 p-4'>
                    <div 
                        className='w-full shadow-2xl rounded-2xl p-4 pt-8 bg-white'
                    >
                        <h1 className="text-4xl mb-2" style={{ color: style.baseColor }}>Header 1</h1>
                        <h2 className="text-3xl mb-2" style={{ color: style.mediumBackgroundColor }}>Header 2</h2>
                        <h3 className="text-2xl mb-4" style={{ color: style.lightBackgroundColor }}>Header 3</h3>

                        <button 
                            style={{ backgroundColor: style.baseColor, color: '#ffffff' }} 
                            className='px-4 py-2 rounded mt-4 mb-2'
                        >
                            Button 1
                        </button>

                        <button 
                            style={{ backgroundColor: style.mediumBackgroundColor, color: '#ffffff' }} 
                            className='px-4 py-2 rounded mt-4 ml-2'
                        >
                            Button 2
                        </button>

                        <div 
                            style={{ backgroundColor: style.lightBackgroundColor }} 
                            className='w-24 h-24 mt-4 rounded-lg'
                        ></div>

                        <div 
                            style={{ backgroundColor: style.darkBackgroundColor }} 
                            className='w-24 h-24 mt-4 rounded-lg ml-4'
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
