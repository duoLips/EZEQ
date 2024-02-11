interface SaveButtonProps {
  content: object
  setContent: React.Dispatch<React.SetStateAction<object>>
}

// eslint-disable-next-line react/prop-types
export const SaveButton: React.FC<SaveButtonProps> = ({ content, setContent }) => {
  const clickHandler = async () => {
    try {
      const success = await window.electronAPI.saveFile(JSON.stringify(content))
      if (success) {
        setContent({})
        console.log('selected file path for saving', success)
      } else {
        console.log('canceled')
      }
    } catch (error) {
      console.error('error while saving file:', error)
    }
  }
  return (
    <>
      <button
        className="mt-5 py-1 px-10 bg-slate-200 border border-gray-400 text-gray-900 text-md
          rounded-md"
        onClick={clickHandler}
      >
        Save
      </button>
    </>
  )
}
