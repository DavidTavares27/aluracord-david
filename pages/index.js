import { Box, Button, Text, TextField, Image } from "@skynexui/components";
import appConfig from "../config.json";
import { useRouter } from 'next/router'
import React from "react";

function Title(props) {
  console.log(props);
  const Tag = props.tag || 'h1';
  return (
    <>
      <Tag>{props.children}</Tag>
      <style jsx>{`
        ${Tag} {
          color: ${appConfig.theme.colors.neutrals["000"]};
          font-size: 24px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
}

//componente React
// function HomePage() {
//   return (
//     <div>
//       <GlobalStyle />
//         <Title tag="h2">Bem vindos de volta!</Title>
//         <h2>Discord - Alura Matrix</h2>

//     </div>
//   )
// }

// export default HomePage

export default function PaginaInicial() {
  // const username = "DavidTavares27";
  const [username, setUsername] = React.useState('');
  const roteamento = useRouter();

  return (
    <>
      <Box
        styleSheet={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor:  "rgba(0,0,0,0)",
          backgroundImage:
            "url(http://2.bp.blogspot.com/-2Djr_ObCarw/Vlx_Ja-G7dI/AAAAAAAAABM/UYxNxw0XRNA/s1600/anime%25281%2529.png)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
        }}
      >
        <Box
          styleSheet={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: "100%",
            maxWidth: "700px",
            borderRadius: "5px",
            padding: "32px",
            margin: "16px",
            boxShadow: "0 2px 10px 0 rgb(0 0 0 / 20%)",
            backgroundColor: "rgba( 0, 0, 0, 0.8 )",
          }}
        >
          {/* Formulário */}
          <Box
            as="form"
            onSubmit={function(infosDoEvento) {
              infosDoEvento.preventDefault();
              console.log('Alguém submeteu o form')
              // roteamento.push(`/chat?username${username}`);
              roteamento.push(`/chat?username=${username}`); 

            }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: { xs: "100%", sm: "50%" },
              textAlign: "center",
              marginBottom: "32px",
            }}
          >
            <Title tag="h2">Boas vindas de volta Animers!</Title>
            <Text
              variant="body3"
              styleSheet={{
                marginBottom: "32px",
                color: appConfig.theme.colors.neutrals[300],
              }}
            >
              {appConfig.name}
            </Text>

            {/* <input 
              type="text"
              value={username}
              onChange={function(event) {
                //Onde está o valor
                const valor = event.target.value;
                //Trocar valor da variável
                //através do React e avise quem precisa
                setUsername(valor);
              }}
            /> */}

            <TextField
              value={username}
              onChange={function(event) {
                //Onde está o valor
                const valor = event.target.value;
                //Trocar valor da variável
                //através do React e avise quem precisa
                setUsername(valor);
              }}
              placeholder="Digite seu usuário"
              fullWidth
              textFieldColors={{
                neutral: {
                  textColor: appConfig.theme.colors.neutrals[900],
                  mainColor: appConfig.theme.colors.neutrals[900],
                  mainColorHighlight: appConfig.theme.colors.alterarDavid[800],
                  backgroundColor: "rgba(135,206,235, 0.9)",
                },
              }}
            />
            <Button
              disabled={username.length < 3}
              type="submit"
              label="Entrar"
              fullWidth
              buttonColors={{
                contrastColor: appConfig.theme.colors.neutrals["000"],
                mainColor: "rgb(30,144,255)",
                mainColorLight: appConfig.theme.colors.alterarDavid[400],
                mainColorStrong: "rgb(0,191,255)",
              }}
            />
          </Box>
          {/* Formulário */}

          {/* Photo Area */}
          <Box
            style={{ display: username.length < 3 ? "none" : "flex" }}
            styleSheet={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "200px",
              padding: "16px",
              backgroundColor: appConfig.theme.colors.neutrals[800],
              border: "1px solid",
              borderColor: appConfig.theme.colors.neutrals[999],
              borderRadius: "10px",
              flex: 1,
              minHeight: "240px",
            }}
          >
            <Image
              styleSheet={{
                borderRadius: "50%",
                marginBottom: "16px",
              }}
              src={`https://github.com/${username}.png`}
            />
            <Text
              variant="body4"
              styleSheet={{
                color: appConfig.theme.colors.neutrals[200],
                backgroundColor: appConfig.theme.colors.neutrals[900],
                padding: "3px 10px",
                borderRadius: "1000px",
              }}
            >
              {username}
            </Text>
          </Box>
          {/* Photo Area */}
        </Box>
      </Box>
    </>
  );
}
