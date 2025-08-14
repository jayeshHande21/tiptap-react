
import ToggleSidebar from './sidebar/ToggleSidebar'
import ReportPage from './home/ReportPage'

const MainContainer = () => {
  return (
    <div className='main-container flex flex-row h-screen w-full'>
        <ToggleSidebar/>
         <ReportPage/>

    </div>
  )
}

export default MainContainer