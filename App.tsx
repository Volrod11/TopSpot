import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import MainContainer from './components/MainContainer'
import Account from './components/Account'
import { View, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { StatusBar } from 'expo-status-bar';
import React from 'react'

export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View style={styles.container}>
      {session && session.user ? <MainContainer key={session.user.id} session={session} /> : <Auth />}
      <StatusBar style = "light" />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});