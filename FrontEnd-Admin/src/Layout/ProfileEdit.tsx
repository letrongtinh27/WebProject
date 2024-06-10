import React, {
    createContext,
    useState,
    useCallback,
    useMemo,
    useContext,
    ReactNode,
} from "react";
import {
    TextInput,
    ImageInput,
    ImageField,
    SimpleForm,
    required,
    useDataProvider,
    useNotify,
    SaveContextProvider,
    useGetIdentity,
    UserIdentity,
} from "react-admin";

interface ProfileContextProps {
    profileVersion: number;
    refreshProfile: () => void;
}

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

interface ProfileProviderProps {
    children: ReactNode;
}

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
    const [profileVersion, setProfileVersion] = useState(0);
    const context = useMemo(
        () => ({
            profileVersion,
            refreshProfile: () =>
                setProfileVersion((currentVersion) => currentVersion + 1)
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

export const ProfileEdit = ({ staticContext, ...props }: Partial<{ staticContext: any }>) => {
    console.log("ProfileEdit");
    const dataProvider = useDataProvider();
    const notify = useNotify();
    const [saving, setSaving] = useState<boolean>(false);
    const { refreshProfile } = useProfile();

    const { identity, isLoading } = useGetIdentity();

    const handleSave = useCallback(
        (values: any) => {
            setSaving(true);
            dataProvider.updateUserProfile(
                { data: values },
                {
                    onSuccess: ({ data }: { data: any }) => {
                        setSaving(false);
                        notify("Your profile has been updated", { type: "info", messageArgs: { _: "Your profile has been updated" } });
                        refreshProfile();
                    },
                    onFailure: () => {
                        setSaving(false);
                        notify(
                            "A technical error occurred while updating your profile. Please try later.",
                            { type: "warning", messageArgs: { _: "A technical error occurred while updating your profile. Please try later." } }
                        );
                    }
                }
            );
        },
        [dataProvider, notify, refreshProfile]
    );

    const saveContext = useMemo(
        () => ({
            save: handleSave,
            saving
        }),
        [saving, handleSave]
    );

    if (isLoading) {
        return null;
    }

    return (
        <SaveContextProvider value={saveContext}>
            <SimpleForm onSubmit={handleSave} record={identity ? identity : {}}>
                <TextInput source="fullName" validate={required()} />
                <ImageInput source="avatar" validate={required()}>
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </SaveContextProvider>
    );
};