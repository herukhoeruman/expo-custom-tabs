import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

export const icons: { [key: string]: (props: any) => JSX.Element } = {
  index: (props: any) => <AntDesign name="home" size={26} {...props} />,
  create: (props: any) => <AntDesign name="pluscircleo" size={26} {...props} />,
  explore: (props: any) => <Feather name="compass" size={26} {...props} />,
  profile: (props: any) => <AntDesign name="user" size={26} {...props} />,
};
