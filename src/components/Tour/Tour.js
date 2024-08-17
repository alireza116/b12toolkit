import {TourProvider} from '@reactour/tour'
import steps from './steps'


const ToolkitTour = ({children}) => {
    const radius = 10
    return <TourProvider showBadge={false} styles={{
        popover: (base) => ({
            ...base,
            '--reactour-accent': '#ef5a3d',
            borderRadius: radius,
            paddingTop: 40,
        }),
        maskArea: (base) => ({...base, rx: radius}),
        badge: (base) => ({...base, left: 'auto', right: '-0.8125em'}),
        controls: (base) => ({...base, marginTop: 100}),
        // close: (base) => ({...base, right: 'auto', left: 8, top: 8}),
    }} steps={steps}>{children}</TourProvider>
}

export default ToolkitTour;