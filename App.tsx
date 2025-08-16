import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import MainContainer from './components/MainContainer'
import { View, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { UserProvider, useUser } from './context/UserContext'

export default function App() {
  return (
    <UserProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <InnerApp />
      </GestureHandlerRootView>
    </UserProvider>
  )
}

function InnerApp() {
  const [session, setSession] = useState<Session | null>(null)
  const { setCurrentUserId } = useUser()

  useEffect(() => {
    // --- Auth session ---
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    // --- WebSocket Supabase ---
    const garagesListener = supabase
      .channel('garages-changes')
      .on(
        'postgres_changes',
        {
          event: '*', // insert, update, delete
          schema: 'public',
          table: 'garages', // remplace par ta table réelle
        },
        payload => {
          console.log('📡 Changement détecté sur garages :', payload)
          // Ici tu peux déclencher un rafraîchissement global
        }
      )
      .subscribe()

    // --- Cleanup ---
    return () => {
      authListener.subscription.unsubscribe()
      supabase.removeChannel(garagesListener)
    }
  }, [])

  // Met à jour le currentUserId dans le contexte
  useEffect(() => {
    setCurrentUserId(session?.user?.id ?? null)
  }, [session])

  return (
    <View style={styles.container}>
      {session && session.user ? <MainContainer /> : <Auth />}
      <StatusBar style="light" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
