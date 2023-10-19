/* eslint-disable react/prop-types */
import { Box, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { supabase } from "./SupaClient";

export function Account({session}) {

  const [ pic, setPic ] = useState('');
  const [ name, setName ] = useState('');
  const [ joined, setJoined ] = useState('');
  const [ timeStudied, setTimeStudied ] = useState('');
  const [ loading, setLoading ]  = useState(true);

  async function getData() {
    await supabase
    .from('profiles')
    .select()
    .eq('full_name', session.user.user_metadata.full_name)
    .then((response) => {
      let user = response.data[0];
      console.log(user);
      setPic(user.avatar_url);
      setName(user.full_name);
      let tc = user.time_created;
      let date = tc.substr(0, 10);
      let jnd = new Date(date).toLocaleString().substring(0, 10);
      setJoined(jnd);
      setTimeStudied(user.time_spent_studying);
      setLoading(false);
    })
  }

  useEffect(() => {
    getData();
  }, [])
  



  return (
    <div className="container">
      <Box display={loading ? 'none' : 'block'} className="account-container">
        <Box display={'flex'} alignItems={'center'}> 
          <img src={pic} />
          <h1>{name}</h1>
        </Box>
        <Text marginTop='5pt' display={loading ? 'none' : 'block'}>Joined at: {joined}</Text>
        <Text display={loading ? 'none' : 'block'}>Time spent studying: {timeStudied}</Text>
      </Box>
      <Box display={loading ? 'block' : 'none'} marginTop='60pt'>
        <Spinner />
      </Box>
    </div>
  )
}