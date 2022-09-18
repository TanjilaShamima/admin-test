import React from 'react'

interface PropsTypes {
  completed: number
}

const UploadProgressBar: React.FC<PropsTypes> = ({ completed }) => {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: '#e0e0de',
    borderRadius: 50,
    margin: 50,
  }

  const fillerStyles = {
    height: '100%',
    width: `${Math.floor(completed)}%`,
    backgroundColor: 'green',
    borderRadius: 'inherit',
  }

  const labelStyles = {
    padding: '0px 10px',
    color: 'white',
    fontWeight: 'bold',
  }
  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${Math.floor(completed)}%`}</span>
      </div>
    </div>
  )
}

export default UploadProgressBar
