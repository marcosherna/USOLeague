import React from "react";
import { StyleSheet, View } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

import XButton from "../components/XButton";
import { LoginScreenProps } from "../navigations";

export default function LoginScreen({ navigation }: LoginScreenProps) {
  const player = useVideoPlayer(
    {
      uri: "https://manifest.googlevideo.com/api/manifest/hls_playlist/expire/1760072884/ei/VEDoaPKLLMz2zLUP4die0QM/ip/168.243.180.179/id/3fd74d59c3b04799/itag/270/source/youtube/requiressl/yes/ratebypass/yes/pfa/1/sgovp/clen%3D15222353%3Bdur%3D30.071%3Bgir%3Dyes%3Bitag%3D137%3Blmt%3D1724835711714146/rqh/1/hls_chunk_host/rr3---sn-upbvn8-n5a6.googlevideo.com/xpc/EgVo2aDSNQ%3D%3D/cps/33/met/1760051284,/mh/fl/mm/31,29/mn/sn-upbvn8-n5a6,sn-hp57ynse/ms/au,rdu/mv/m/mvi/3/pl/22/rms/au,au/initcwndbps/347500/bui/ATw7iSUficzywaq2S6Lo0Aewk7fK8PwU0y6JFBXjup-hvbnU5mUbrZc9MdaJNHFwk5rd_eyzpLOkwsjO/spc/hcYD5QDxqTdILEE2CKuH70lwRLJqTxGMfSQc71tRs0VMWEemkxbAam38o2ge5TdJ/vprv/1/playlist_type/DVR/dover/13/txp/8208224/mt/1760050889/fvip/4/short_key/1/keepalive/yes/fexp/51552689,51565115,51565681,51580968/sparams/expire,ei,ip,id,itag,source,requiressl,ratebypass,pfa,sgovp,rqh,xpc,bui,spc,vprv,playlist_type/sig/AJfQdSswRQIgN84PhOHE8LJKFpBYojKTquneVIeGsHPrd_kgYf-qV74CIQDYdk8erU_64TQV7QLBeqNnIufuDxmA0zKh8ynKKBSIyQ%3D%3D/lsparams/hls_chunk_host,cps,met,mh,mm,mn,ms,mv,mvi,pl,rms,initcwndbps/lsig/APaTxxMwRgIhAKUNp73HLCvhu0S2w-de8KRv0OxL9ALOMaWtdp9ao8VMAiEAiHfb1uBjhJXZ9vFQyvy7tgdKQOH5Zqv8_7rqfxGOEZg%3D/playlist/index.m3u8",
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
          <XButton variant="outlined" title="G" onPress={() => handleSignIn()} /> 
          <XButton variant="outlined" title="M" onPress={() => handleSignIn()} />
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
