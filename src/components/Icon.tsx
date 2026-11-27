import activity from 'bootstrap-icons/icons/activity.svg?url'
import calendar2Check from 'bootstrap-icons/icons/calendar2-check.svg?url'
import envelope from 'bootstrap-icons/icons/envelope.svg?url'
import eye from 'bootstrap-icons/icons/eye.svg?url'
import eyeSlash from 'bootstrap-icons/icons/eye-slash.svg?url'
import gear from 'bootstrap-icons/icons/gear.svg?url'
import heartPulse from 'bootstrap-icons/icons/heart-pulse.svg?url'
import houseDoor from 'bootstrap-icons/icons/house-door.svg?url'
import journalCheck from 'bootstrap-icons/icons/journal-check.svg?url'
import journalMedical from 'bootstrap-icons/icons/journal-medical.svg?url'
import lock from 'bootstrap-icons/icons/lock.svg?url'
import people from 'bootstrap-icons/icons/people.svg?url'
import playFill from 'bootstrap-icons/icons/play-fill.svg?url'
import search from 'bootstrap-icons/icons/search.svg?url'
import xLarge from 'bootstrap-icons/icons/x-lg.svg?url'
import boxArrowRight from 'bootstrap-icons/icons/box-arrow-right.svg?url'
import personWorkspace from 'bootstrap-icons/icons/person-workspace.svg?url'
import './Icon.css'

const iconUrls = {
    activity,
    'box-arrow-right': boxArrowRight,
    'calendar2-check': calendar2Check,
    envelope,
    eye,
    'eye-slash': eyeSlash,
    gear,
    'heart-pulse': heartPulse,
    'house-door': houseDoor,
    'journal-check': journalCheck,
    'journal-medical': journalMedical,
    lock,
    people,
    'play-fill': playFill,
    search,
    'x-lg': xLarge,
    'person-workspace': personWorkspace,
}

export type IconName = keyof typeof iconUrls

type IconProps = {
    name: IconName
    className?: string
}

export function Icon({ name, className = '' }: IconProps) {
    const iconUrl = `url("${iconUrls[name]}")`

    return (
        <span
            aria-hidden="true"
            className={`app-icon${className ? ` ${className}` : ''}`}
            style={{ maskImage: iconUrl, WebkitMaskImage: iconUrl }}
        />
    )
}
