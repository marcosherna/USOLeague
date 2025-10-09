import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import XButton from "../components/XButton";
import { MainAppScreenProps } from "../navigations";

export default function LoginScreen({ navigation }: MainAppScreenProps) {
  const player = useVideoPlayer(
    {
      uri: "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1760047513/ei/Od3naLjfMer7zLUP_bLU-Q0/ip/168.243.183.143/id/1ac3efa2938ec81b/itag/270/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgovp/clen%3D13200412%3Bdur%3D40.499%3Bgir%3Dyes%3Bitag%3D137%3Blmt%3D1739560242812753/rqh/1/hls_chunk_host/rr6---sn-upbvn8-n5ad.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/0/met/1760025913,/mh/-s/mm/31,29/mn/sn-upbvn8-n5ad,sn-hp57knk7/ms/au,rdu/mv/m/mvi/6/pl/22/rms/au,au/initcwndbps/393750/bui/ATw7iSU3LjwtwG2w1IOfg0u6201Atr4ZtCxuukv50yo1-BFEQki8pnICh3QJfz3n8sYEL7vRy_aYFE5e/spc/hcYD5fOsgVkg3ALeHGLlBKKYngEG-NqrjOI4N4A-ODQAVRFPpKIN6vktiEYBJblR/vprv/1/playlist_type/DVR/dover/13/txp/543C534/mt/1760025458/fvip/3/short_key/1/keepalive/yes/fexp/51552689,51565115,51565681,51580968/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgovp,rqh,xpc,bui,spc,vprv,playlist_type/sig/AJfQdSswRQIhAIYKwMvewREMZ2UZUlGSYPLJYGkdvNNaEqwfT3fXrCLWAiBxpPWx8_dMU6tpzGE_YVTauxvJ2dbMgc37R0c2GAZFBQ%3D%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRgIhAMbgxR2R3EzwnuOquZPcH_CYm4uzrsxvLUZlXaXz_9RHAiEAojPe5qTchj_hxbQ-fbqr-Ad1_dvXfVOhh7zV-nk77y0%3D/playlist/index.m3u8",
    },
    (player) => {
      player.loop = true;
      player.play();
      player.muted = true;
    }
  );

  const handleSignIn = () => {
    navigation.navigate("main-app");
  };

  return (
    <View style={styles.container}>
      <VideoView
        style={StyleSheet.absoluteFillObject}
        player={player}
        allowsPictureInPicture={false}
        contentFit="cover"
        fullscreenOptions={{
          enable: true,
        }}
      />

      <View style={styles.overlay}>
        <XButton
          title="Register"
          variant="outlined"
          onPress={() => handleSignIn()}
        />
        <XButton title="Sign in" onPress={() => handleSignIn()} />
        <View
          style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}
        >
          <XButton
            variant="icon"
            icon={
              <View>
                <Text>G</Text>
              </View>
            }
            countor="circular"
            onPress={() => handleSignIn()}
          />

          <XButton
            variant="icon"
            icon={
              <View>
                <Text>M</Text>
              </View>
            }
            countor="circular"
            onPress={() => handleSignIn()}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
    gap: 10,
    padding: 20,
  },
});
