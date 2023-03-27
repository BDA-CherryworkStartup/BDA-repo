import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import FrontPage from './ClauseFolder/FrontPage'
import Header from './Header'
import SidebarComponent from './SidebarComponent'

const ClauseLib = () => {
  return (
    <div>
      <Header />
      <Stack direction="row" spacing={2}>
        <SidebarComponent />
        <div style={{ marginTop: "100px" }}>
          <FrontPage />
        </div>
      </Stack>
    </div>
  )
}

export default ClauseLib