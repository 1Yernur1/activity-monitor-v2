import { Drawer } from "@mui/material"
import { useState } from "react"

export const ProjectsDrawer = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const toggleDrawer = (openStatus: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (event && 'type' in event && ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')) {
      return;
    }
    setOpenDrawer(openStatus);
  };
  return (
    <Drawer anchor="left" open={false}>
      <div style={{ width: 250 }}>
          <p>This is a simple drawer content.</p>
        </div>
    </Drawer>
  )
}