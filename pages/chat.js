
import { Box, Text, TextField, Image, Button, } from "@skynexui/components";
import React, { useState } from "react";
import appConfig from "../config.json";
import {createClient} from '@supabase/supabase-js'

export default function ChatPage({SUPABASE_URL, SUPABASE_ANON_KEY} ) {
  const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY );
  // console.log(SUPABASE_ANON_KEY);
  // console.log(SUPABASE_URL);

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  React.useEffect(() => {
      supabaseClient
        .from('mensagem')
        .select('*')
        .order('id', {ascending: false })
        .then(({data}) => {
          console.log('Dados da consulta', data)
          setMessageList(data);
        })
  }, []);
 
  function handleNewMessage(newMessage) {
    const message = {
      // id: messageList.length + Math.random() * 100,
      text: newMessage,
      user: "DavidTavares27",
    };

    supabaseClient
      .from('mensagem')
      .insert([
        //Tem que ser um objeto com os mesmos campos que foram escritos no supabase
        message
      ])
      .then(({data}) => {
          // console.log("criando mensagem", Retorno)
          setMessageList([data[0], ...messageList,
          ]);
          setMessage("");
      });

   
  }

  function handleDeleteMessage(event) {
    const messageId = Number(event.target.dataset.id);
    const messageListFiltered = messageList.filter((messageFiltered) => {
      return messageFiltered.id != messageId;
    });

    setMessageList(messageListFiltered);
  }

  return (
    <Box
      styleSheet={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0)",
        backgroundImage: "url(https://images6.alphacoders.com/656/thumb-1920-656029.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "bottom center",
        backgroundBlendMode: "multiply",
        color: appConfig.theme.colors.neutrals["000"],
      }}
    >
      <Box
        styleSheet={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
          borderRadius: "5px",
          backgroundColor: "rgba( 0, 0, 0, 0.8 )",
          height: "100%",
          maxWidth: "95%",
          maxHeight: "95vh",
          padding: "32px",
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: "relative",
            display: "flex",
            flex: 1,
            height: "80%",
            backgroundColor: "rgba( 0, 0, 0, 0.4 )",
            flexDirection: "column",
            borderRadius: "5px",
            padding: "16px",
          }}
        >
          <MessageList
            messageList={messageList}
            handleDeleteMessage={handleDeleteMessage}
          />
          {/* Lista de mensagens:
                    <ul>
                        {messageList.map((messageItem) => {
                            return (
                                <li key={messageItem.id}>
                                    {messageItem.user}: {messageItem.text}
                                </li>
                            )
                        })}
                    </ul> */}

          <Box
            as="form"
            styleSheet={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <TextField
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleNewMessage(message);
                }
              }}
              placeholder="Insira sua mensagem aqui..."
              type="textarea"
              styleSheet={{
                width: "100%",
                border: "0",
                resize: "none",
                borderRadius: "5px",
                padding: "6px 8px",
                backgroundColor: appConfig.theme.colors.neutrals[500],
                marginRight: "12px",
                color: appConfig.theme.colors.neutrals[200],
              }}
            />
            <Button
              onClick={() => handleNewMessage(message)}
              label="Enviar"
              fullWidth
              styleSheet={{
                maxWidth: "50px",
                height: "42px",
                marginTop: "-8px",
              }}
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: "rgb(30,144,255)",
                mainColorLight: appConfig.theme.colors.primary[800],
                mainColorStrong: "rgb(0,191,255)",
              }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export async function getServerSideProps() {
  //const key = process.env.SUPABASE_ANON_KEY;
  //const key = process.env.SUPABASE_URL:
  const { SUPABASE_ANON_KEY, SUPABASE_URL} = process.env;

  return {
    props: {
      SUPABASE_ANON_KEY,
      SUPABASE_URL,
    },
  };
}

function Header() {
  return (
    <>
      <Box
        styleSheet={{
          width: "100%",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text 
        styleSheet={{
          fontSize: "22px",
          marginLeft: "25px",
        }}
        variant="heading5">
          Entre na conversa
        </Text>
        <Button
          variant="tertiary"
          colorVariant="neutral"
          label="Logout"
          styleSheet={{
            backgroundColor: "rgb(30,144,255)",
          }}
          buttonColors={{
            mainColor: "rgb(255, 255, 255)",
            mainColorLight: "rgb(0,191,255)",
          }}
          href="/"
        />
      </Box>
    </>
  );
}

function MessageList(props) {
  const handleDeleteMessage = props.handleDeleteMessage;

  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: "16px",
      }}
    >
      {props.messageList.map((messageItem) => {
        return (
          <Text
            key={messageItem.id}
            tag="li"
            styleSheet={{
              borderRadius: "12px",
              padding: "6px",
              marginBottom: "12px",
              wordBreak: "break-word",
              hover: {
                backgroundColor: "rgba( 0, 0, 0, 0.9 )",
              },
            }}
          >
            <Box
              styleSheet={{
                marginBottom: "8px",
                position: "relative",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                styleSheet={{
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  display: "inline-block",
                  marginRight: "8px",
                }}
                src={`https://github.com/${messageItem.user}.png`}
              />
              <Text tag="strong">{messageItem.user}</Text>
              <Text
                styleSheet={{
                  fontSize: "12px",
                  marginLeft: "8px",
                  color: appConfig.theme.colors.neutrals[300],
                }}
                tag="span"
              >
                {new Date().toLocaleDateString()}
              </Text>
              <Text
                onClick={handleDeleteMessage}
                styleSheet={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  marginLeft: "auto",
                  color: "rgba(255, 255, 255, 255)",
                  backgroundColor: "rgba(255, 0, 0)",
                  width: "25px",
                  height: "25px",
                  borderRadius: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginRight: "8px",
                  cursor: "pointer",
                }}
                tag="span"
                data-id={messageItem.id}
              >
               X
              </Text>
            </Box>
            {messageItem.text}
          </Text>
        );
      })}
    </Box>
  );
}