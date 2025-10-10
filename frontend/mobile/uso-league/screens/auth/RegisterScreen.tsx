import React from "react";
import { View, StyleSheet, TextInput } from "react-native";
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
  KeyboardToolbar,
} from "react-native-keyboard-controller";

import { RegisterScreenProps } from "../../navigations";
import { useTheme } from "../../hooks/useTheme";

import XButton from "../../components/XButton";
import XInput from "../../components/XInput";
import { useInput } from "../../hooks/useInput";
import { spacing } from "../../theme/spacing";

export default function RegisterScreen({ navigation }: RegisterScreenProps) {
  const { theme } = useTheme();

  // const [email, setEmail] = React.useState("");
  // const [password, setPassword] = React.useState("");

  const email = useInput("", [
    { type: "required", message: "El correo es obligatorio" },
    { type: "email", message: "Formato de correo inválido" },
  ]);

  const password = useInput("", [
    { type: "required", message: "La contraseña es obligatoria" },
    {
      type: "minLength",
      value: 8,
      message: "Debe tener al menos 8 caracteres",
    },
  ]);

  const handleNavigateBack = () => navigation.pop();

  const handleSubmit = () => {
    if (email.validate() && password.validate()) {
      console.log("Formulario válido", {
        email: email.value,
        password: password.value,
      });
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
      >
        <View style={styles.bottomSection}>
          <View style={styles.form}>
            <XInput
              input={email}
              keyboardType="email-address"
              placeholder="Digite su email"
            />
            <XInput
              input={password}
              keyboardType="visible-password" 
              placeholder="Digite su password"
              password
            />
            {/* <TextInput
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              placeholder="Email"
              
              style={{
                backgroundColor: "#fff",
                padding: 20,
              }}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              keyboardType="visible-password" 
              placeholder="password" 
              style={{
                backgroundColor: "#fff",
                padding: 20,
              }}
            /> */}
          </View>

          <View style={styles.buttons}>
            <XButton title="Registrar" onPress={handleSubmit} />
            <XButton
              variant="ghost"
              title="Iniciar sesión"
              onPress={() => navigation.pop()}
            />
          </View>
        </View>

        {/* Toolbar estable, solo un vez */}
        {/* <KeyboardToolbar /> */}
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "flex-end",
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  bottomSection: {
    gap: spacing.md,
  },
  form: {
    gap: spacing.sm,
  },
  buttons: {
    gap: spacing.sm,
  },
});

// import React from "react";
// import { View } from "react-native";
// import {
//   KeyboardAwareScrollView,
//   KeyboardProvider,
//   KeyboardToolbar,
// } from "react-native-keyboard-controller";

// import { RegisterScreenProps } from "../../navigations";
// import { useTheme } from "../../hooks/useTheme";

// import XButton from "../../components/XButton";
// import XInput from "../../components/XInput";
// import { useInput } from "../../hooks/useInput";
// import { spacing } from "../../theme/spacing";

// export default function RegistrerScreen({ navigation }: RegisterScreenProps) {
//   const { theme } = useTheme();

//   const email = useInput("", [
//     { type: "required", message: "El correo es obligatorio" },
//     { type: "email", message: "Formato de correo inválido" },
//   ]);

//   const password = useInput("", [
//     { type: "required", message: "La contraseña es obligatoria" },
//     {
//       type: "minLength",
//       value: 8,
//       message: "Debe tener al menos 8 caracteres",
//     },
//   ]);

//   const handleNavigateBack = () => {
//     navigation.pop();
//   };

//   const handleSubmit = () => {
//     if (email.validate() && password.validate()) {
//       console.log("Formulario válido", {
//         email: email.value,
//         password: password.value,
//       });
//     }
//   };

//   return (
//     <KeyboardProvider>
//       <View
//         style={{
//           flex: 1,
//           justifyContent: "flex-end",
//         }}
//       >
//         <View>
//           <KeyboardAwareScrollView
//             contentContainerStyle={{
//               gap: spacing.sm,
//               flexGrow: 1,
//               justifyContent: "center",
//               paddingHorizontal: spacing.md,
//             }}
//           >
//             <XInput input={email} placeholder="Digite su email" />
//             <XInput
//               input={password}
//               placeholder="Digite su password"
//               password
//             />
//           </KeyboardAwareScrollView>

//           <View style={{ padding: spacing.md, gap: spacing.sm }}>
//             <XButton title="Registrar" onPress={handleSubmit} />
//             <XButton
//               variant="ghost"
//               title="Iniciar sesión"
//               onPress={handleNavigateBack}
//             />
//           </View>
//         </View>
//         <KeyboardToolbar />
//       </View>
//     </KeyboardProvider>
//   );
// }
