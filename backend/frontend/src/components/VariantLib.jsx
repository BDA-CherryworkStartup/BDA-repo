import { Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React from 'react'
import Variant from './ClauseFolder/Variant'
import Header from './Header'
import SidebarComponent from './SidebarComponent'

const VariantLib = () => {
  return (
    <div>
      <Header />
      <Stack direction="row" spacing={2}>
        <SidebarComponent />
        <div style={{marginTop: "100px"}}>
          <Variant />
        </div>
      </Stack>
    </div>
  )
}

export default VariantLib