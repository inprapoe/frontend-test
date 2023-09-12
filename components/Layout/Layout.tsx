"use client"
import { deleteCookie, getCookie } from "@/utils/cookieHandler";
import { ReactNode, useEffect, useState } from "react";
import { MdOutlineDashboard, MdOutlineLogout } from 'react-icons/md'
import LoginPage from "../../app/login/page";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Loading from "../Loading/Loading";
import styles from './Layout.module.css'
import { motion } from "framer-motion"

interface Props {
  children?: ReactNode,
  // eslint-disable-next-line no-unused-vars
  token?: (token: string | null) => void,
  title: string
}

export default function Layout({
  children,
  token,
  title
}: Props) {

  const pathname = usePathname()

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [layoutToken, setLayoutToken] = useState<string | null>(null)

  function logoutHandler() {
    deleteCookie('token')
    setLayoutToken(null)
  }

  useEffect(() => {
    const CHECK_TOKEN = getCookie('token') 
    const parsedToken = CHECK_TOKEN && JSON.parse(CHECK_TOKEN)
    setLayoutToken(parsedToken)
    setIsLoading(false)
  },[])

  useEffect(() => {
    token && token(layoutToken)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layoutToken])

  return (
    isLoading ? (
      <Loading label="Loading"/>
    ) : !layoutToken ? (
      <LoginPage onSubmitSuccess={(tkn) => setLayoutToken(tkn)}/>
    ) : (
      <>
        <div id="sidebar" className={styles.sidebar}>
          <motion.div 
            className={styles.logo}
            initial={{ opacity: 0, translateY: 10 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            viewport={{ once: true }}
          >
            TESTDASH
          </motion.div>
          <motion.ul
            className={styles.sidebar__list}
            initial="hidden"
            animate="show"
            variants={{
              hidden: {
                opacity: 0,
                translateY: 10
              },
              show: {
                opacity: 1,
                translateY: 0,
                transition: {
                  delayChildren: 0.3
                }
              }
            }}
          >
            <motion.li
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 }
              }}
            >
              <Link href={'/'}  className="link link--btn w-full" aria-label={pathname === '/' ? "active" : ''}>
                <span>
                  <MdOutlineDashboard className="text-xl"/>
                </span>
                <span>
                  Dashboard
                </span>
              </Link>
            </motion.li>
          </motion.ul>
          <div className="p-6">
            <motion.button 
              className="link link--btn w-full" 
              initial={{ opacity: 0, translateY: 10 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
              onClick={logoutHandler}
            >
              <MdOutlineLogout className="text-xl"/>
              <span>
                Log Out
              </span>
            </motion.button>
          </div>
        </div>

        <main className={styles.content}>
          {title && (
            <motion.h1 
              className="font-bold text-xl"
              initial={{ opacity: 0, translateY: 10 }}
              whileInView={{ opacity: 1, translateY: 0 }}
              viewport={{ once: true }}
            >
              {title}
            </motion.h1>
          )}
          {children}
        </main>
      </>
    )
  )
}
