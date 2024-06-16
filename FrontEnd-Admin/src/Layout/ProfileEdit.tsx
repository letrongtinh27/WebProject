import React, {
  createContext,
  useState,
  useCallback,
  useMemo,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import {
  TextInput,
  required,
  useDataProvider,
  useNotify,
  SaveContextProvider,
  useGetIdentity,
  DateInput,
  Toolbar,
  TabbedForm,
  SaveButton,
  SelectInput,
} from "react-admin";
import { authProvider } from "../services/authProvider";

interface ProfileContextProps {
  profileVersion: number;
  refreshProfile: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(
  undefined
);

interface ProfileProviderProps {
  children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [profileVersion, setProfileVersion] = useState(0);
  const context = useMemo(
    () => ({
      profileVersion,
      refreshProfile: () =>
        setProfileVersion((currentVersion) => currentVersion + 1),
    }),
    [profileVersion]
  );

  return (
    <ProfileContext.Provider value={context}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = (): ProfileContextProps => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};

export const ProfileEdit = ({
  staticContext,
  ...props
}: Partial<{ staticContext: any }>) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const [saving, setSaving] = useState<boolean>(false);
  const { refreshProfile, profileVersion } = useProfile();
  const { identity, isLoading, refetch } = useGetIdentity();
  const gender = [
    { id: "0", name: "Nam" },
    { id: "1", name: "Nữ" },
  ];

  useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [profileVersion, refetch]);

  const validatePasswords = (values: any) => {
    const errors: any = {};
    if (values.new_password && values.new_password !== values.check) {
      errors.check = ["Passwords do not match"];
    }
    return errors;
  };

  const formatDate = (date: any) => {
    if (typeof date === "object") {
      const day = String(date.getDate()).padStart(2, "0"); // Lấy ngày và thêm '0' nếu cần
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Lấy tháng và thêm '0' nếu cần
      const year = date.getFullYear(); // Lấy năm
      return `${day}-${month}-${year}`; // Định dạng chuỗi "nn/mm/yyyy"
    } else {
      const parst = date.split("-");
      return `${parst[2]}-${parst[1]}-${parst[0]}`; // Định dạng chuỗi "nn/mm/yyyy"
    }
  };

  const handleSave = useCallback(
    (values: any) => {
      setSaving(true);
      const data = {
        id: values.id,
        birthday: formatDate(values.birthday),
        email: "",
        fullName: values.fullName,
        gender: values.gender == 0 ? "Nam" : "Nữ",
        phone: values.phone,
        username: values.username,
        changePassword: values.new_password ? true : false,
        password: values.new_password || "",
      };
      authProvider
        .update("user", data)
        .then((data: any) => {
          console.log(data.data);
          setSaving(false);
          if (data.data.code === 400) {
            notify(data.data.message);
          } else {
            notify("Thay đổi thông tin cá nhân thành công");
            refreshProfile();
          }
        })
        .catch((error: any) => {
          setSaving(false);
          notify("Thay đổi thông tin cá nhân thất bại");
        });
    },
    [dataProvider, notify, refreshProfile]
  );

  const saveContext = useMemo(
    () => ({
      save: handleSave,
      saving,
    }),
    [saving, handleSave]
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!identity) {
    return <div>No identity found</div>;
  }

  return (
    <SaveContextProvider value={saveContext}>
      <TabbedForm
        record={identity}
        onSubmit={handleSave}
        validate={validatePasswords}
        sx={{ maxWidth: "40em" }}
        toolbar={
          <Toolbar>
            <SaveButton label="Save" alwaysEnable />
          </Toolbar>
        }
      >
        <TabbedForm.Tab label="Profile">
          <TextInput
            source="username"
            validate={required()}
            label="Username"
            fullWidth
            readOnly
          />
          <TextInput source="email" validate={required()} fullWidth readOnly />
          <TextInput source="fullName" validate={required()} fullWidth />
          <DateInput source="birthday" validate={required()} fullWidth />
          <SelectInput
            source="gender"
            choices={gender}
            validate={required()}
            fullWidth
          />
          <TextInput source="phone" fullWidth />
        </TabbedForm.Tab>
        <TabbedForm.Tab label={"Change Password"}>
          <TextInput source="new_password" type={"password"} fullWidth />
          <TextInput
            source="check"
            type={"password"}
            fullWidth
            label={"Enter a new password"}
          />
        </TabbedForm.Tab>
      </TabbedForm>
    </SaveContextProvider>
  );
};
