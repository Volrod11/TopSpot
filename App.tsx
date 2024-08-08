import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import MainContainer from './components/MainContainer'
import Account from './components/Account'
import { View, StyleSheet } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { StatusBar } from 'expo-status-bar';
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

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
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        {session && session.user ? <MainContainer key={session.user.id} session={session} /> : <Auth />}
        <StatusBar style = "light" />
      </View>
    </GestureHandlerRootView>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});