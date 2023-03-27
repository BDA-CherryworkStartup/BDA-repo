import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Versions from './ClauseFolder/Versions'
import Header from './Header'
import SidebarComponent from './SidebarComponent'

const VersionLib = () => {
  return (
    <div>
      <Header />
      <Stack direction="row" spacing={2}>
        <SidebarComponent />
        <div style={{marginTop: "100px", maxWidth: "100vh"}}>
          <Versions />
        </div>
      </Stack>
    </div>
  )
}

export default VersionLib