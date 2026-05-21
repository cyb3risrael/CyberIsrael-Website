import React, { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type Lang = 'en' | 'he'

interface LangContextType {
  lang: Lang
  setLang: (lang: Lang) => void
  isRTL: boolean
}

const LangContext = createContext<LangContextType | undefined>(undefined)

export const LangProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { i18n } = useTranslation()
  const [lang, setLangState] = useState<Lang>(() => {
    return (localStorage.getItem('cyberisrael-lang') as Lang) || 'en'
  })

  const isRTL = lang === 'he'

  useEffect(() => {
    i18n.changeLanguage(lang)
    localStorage.setItem('cyberisrael-lang', lang)
    document.documentElement.lang = lang
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  }, [lang, i18n, isRTL])

  const setLang = (l: Lang) => setLangState(l)

  return (
    <LangContext.Provider value={{ lang, setLang, isRTL }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = (): LangContextType => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
