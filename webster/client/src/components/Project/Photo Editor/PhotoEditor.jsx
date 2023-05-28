import React from 'react'
import { ErrorButton } from '../../../styles/ErrorPagesStyles'
import { BoxEl } from '../../../styles/RegisterStyle'
import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
export const PhotoEditor = () => {
  const myTheme = {
  // Theme object to extends default dark theme.
};
  return (
    
      <ImageEditor
        includeUI={{
          theme: myTheme,
          menu:  ['crop', 'flip', 'rotate', 'draw', 'shape', 'icon', 'text', 'mask', 'filter'],
          initMenu: 'filter',
          uiSize: {
            width: '100%',
            height: '100%',
          },
          menuBarPosition: 'right',
        }}
        cssMaxHeight={1920}
        cssMaxWidth={1080}
        selectionStyle={{
          cornerSize: 20,
          rotatingPointOffset: 70,
        }}
        usageStatistics={false}
      />
  )
}
