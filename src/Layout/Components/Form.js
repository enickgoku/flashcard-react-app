import React from 'react'

function Form({ formData, handleChange }) {

  // Brings in data from Add card and Edit card.

  return (
    <>
      <div className="form-group">
        <label htmlFor='front'>Front</label>
        <textarea type="text" name="front" className="form-control form-control-lg" id="front" placeholder="Front side of card." value={formData.front} onChange={handleChange}/>
      </div>
      <div className="form-group">
        <label htmlFor='back'>Back</label>
        <textarea type="text" name="back" className="form-control form-control-lg" id="back" rows="3" placeholder="Back side of card." value={formData.back} onChange={handleChange}/>
      </div>
    </>
  )
}

export default Form
