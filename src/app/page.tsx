'use client'

import { supabase } from "@/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [session, setSession] = useState<any | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession.data.session, currentSession.data, currentSession);
    setSession(currentSession.data.session);
    setLoading(false);
  }

  const logOut = async () => {
    await supabase.auth.signOut();
  }

  useEffect(() => {
    fetchSession();

    const {data: authListener} = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    });

    return () => {
      authListener.subscription.unsubscribe();
    }
  }, [])

  useEffect(() => {
    if(loading) return;

    if(!session){
      router.push('/login')
    }
  }, [session, loading])

  return (
    <> <button className="cursor-pointer" onClick={logOut}>Log out</button> </>
  );
}
