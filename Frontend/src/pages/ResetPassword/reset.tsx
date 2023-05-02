import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'

const reset = () => {
    const [password,setPassword]=useState('');

  return (
    <div>
       <TextField
            autoFocus
            label="Location"
            fullWidth
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button variant='contained' color='primary'>submit</Button>
          <Button variant='contained' color='error'>cancel</Button>

    </div>
  )
}

export default reset
