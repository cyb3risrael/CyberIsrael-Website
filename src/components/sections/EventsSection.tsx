import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaTrophy, FaTools, FaMicrophone, FaVideo, FaUsers, FaChalkboardTeacher } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

const eventTypes = {
  ctf: {
    icon: FaTrophy,
    color: '#00FF88',
  },
  workshop: {
    icon: FaTools,
    color: '#00D4FF',
  },
  conference: {
    icon: FaMicrophone,
    color: '#8B5CF6',
  },
  webinar: {
    icon: FaVideo,
    color: '#FFD700',
  },
  meetup: {
    icon: FaUsers,
    color: '#F97316',
  },
  online_lecture: {
    icon: FaChalkboardTeacher,
    color: '#EF4444',
  },
}

interface EventItem {
  type: keyof typeof eventTypes
  title: string
  desc: string
  date: string
}

interface EventCardProps extends EventItem {
  upcoming?: boolean
  delay: number
}

const EventCard: React.FC<EventCardProps> = ({
  type,
  title,
  desc,
  date,
  upcoming,
  delay,
}) => {
  const { theme } = useTheme()
  const { t } = useTranslation()

  const eventType =
    eventTypes[type] ??
    eventTypes.workshop

  if (!eventTypes[type]) {
    console.error(`Unknown event type "${type}". Falling back to workshop.`)
    console.log({
      event: { type, title, desc, date },
    })
  }

  const { icon: Icon, color } = eventType

  const label = t(`events.labels.${type}`)
  const safeLabel =
    label === `events.labels.${type}`
      ? type
      : label

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ x: 4 }}
      className={`relative p-5 rounded-xl border group cursor-default transition-all duration-300 ${theme === 'dark'
        ? 'bg-cyber-card border-cyber-border/40 hover:border-cyber-teal/30'
        : 'bg-white border-light-border shadow-sm hover:shadow-md'
        }`}
    >
      {upcoming && (
        <div className="absolute -top-2.5 right-4">
          <span
            className="px-2 py-0.5 rounded-full text-xs font-display tracking-widest"
            style={{
              background: `${color}20`,
              color,
              border: `1px solid ${color}40`,
            }}
          >
            {t('events.upcoming')}
          </span>
        </div>
      )}

      <div className="flex items-start gap-4">
        <div
          className="p-2.5 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, color }}
        >
          <Icon size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3
              className={`font-display font-bold text-sm ${theme === 'dark'
                ? 'text-white'
                : 'text-light-text'
                }`}
            >
              {title}
            </h3>

            <span
              className={`text-xs flex-shrink-0 font-display ${theme === 'dark'
                ? 'text-slate-500'
                : 'text-light-muted'
                }`}
            >
              {date}
            </span>
          </div>

          <p
            className={`text-xs leading-relaxed mb-2 ${theme === 'dark'
              ? 'text-slate-400'
              : 'text-light-muted'
              }`}
          >
            {desc}
          </p>

          <span
            className="text-xs font-display tracking-widest uppercase"
            style={{ color }}
          >
            {safeLabel}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const EventsSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const safeEvents = (key: string): EventItem[] => {
    try {
      const value = t(key, { returnObjects: true })

      if (!Array.isArray(value)) {
        console.error(`${key} is not an array.`)
        console.log('Received value:', value)
        return []
      }

      return value.filter((event, index) => {
        const valid =
          event &&
          typeof event === 'object' &&
          typeof event.title === 'string' &&
          typeof event.desc === 'string' &&
          typeof event.date === 'string' &&
          typeof event.type === 'string'

        if (!valid) {
          console.error(`Invalid event at ${key}[${index}]`)
          console.log(event)
        }

        return valid
      }) as EventItem[]
    } catch (err) {
      console.error(`Failed loading ${key}`)
      console.log(err)
      return []
    }
  }

  const upcomingEvents = safeEvents('events.upcoming_list')
  const pastEvents = safeEvents('events.past_list')

  const labelsObj = (() => {
    try {
      const value = t('events.labels', {
        returnObjects: true,
      })

      if (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
      ) {
        return value as Record<string, string>
      }

      console.error('events.labels is invalid')
      console.log(value)
    } catch (err) {
      console.error('Failed loading events.labels')
      console.log(err)
    }

    return {}
  })()

  const upcomingLabel =
    labelsObj.upcoming ??
    t('events.labels.upcoming') ??
    'Upcoming'

  const pastLabel =
    labelsObj.past ??
    t('events.labels.past') ??
    'Past'

  return (
    <section id="events" className="pt-10 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className={`font-display text-xs tracking-widest uppercase ${theme === 'dark'
              ? 'text-cyber-purple'
              : 'text-purple-500'
              }`}
          >
            {t('events.subtitle')}
          </span>

          <h2 className="section-title mt-2">
            <span
              className={
                theme === 'dark'
                  ? 'text-white'
                  : 'text-light-text'
              }
            >
              {t('events.title')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="font-display text-xs tracking-widest uppercase mb-5 flex items-center gap-2 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
              {upcomingLabel}
            </h3>

            <div className="space-y-4">
              {upcomingEvents.map((event, idx) => (
                <EventCard
                  key={`upcoming-${idx}`}
                  {...event}
                  upcoming
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-xs tracking-widest uppercase mb-5 flex items-center gap-2 text-red-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]">
              {pastLabel}
            </h3>

            <div className="space-y-4">
              {pastEvents.map((event, idx) => (
                <EventCard
                  key={`past-${idx}`}
                  {...event}
                  delay={idx * 0.1}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EventsSection