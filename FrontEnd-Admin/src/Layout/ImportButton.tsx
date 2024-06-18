import React from 'react';
import { useNotify, useRefresh, useDataProvider } from 'react-admin';
import { Button } from '@mui/material';
import PublishIcon from '@mui/icons-material/Publish';
import PublishRoundedIcon from '@mui/icons-material/PublishRounded';
import Papa from 'papaparse';

interface ImportButtonProps {
    isSmall: boolean;
}

const ImportButton: React.FC<ImportButtonProps> = ({ isSmall }) => {
    const notify = useNotify();
    const refresh = useRefresh();
    const dataProvider = useDataProvider();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        const reader = new FileReader();
        reader.onload = async (e) => {
            const text = e.target?.result;
            if (typeof text === 'string') {
                Papa.parse(text, {
                    header: true,
                    complete: async (results: any) => {
                        const data = results.data;
                        for (const row of data) {
                            if (!row.title) {
                                continue;
                            }
                            const category = row.category ? row.category.split(';').map((categoryId: string) => parseInt(categoryId, 10)) : [];

                            const formattedData: {
                                background_img_url: string;
                                title_img_url: string;
                                title: string;
                                released_date: string;
                                trailer_video_url: string;
                                poster_url: string;
                                description: string;
                                sub_title: string;
                                age_type: string;
                                type: string;
                                is_active: string;
                                category: number[];
                            } = {
                                background_img_url: row.background_img_url || '',
                                title_img_url: row.title_img_url || '',
                                title: row.title,
                                released_date: new Date(row.released_date).toLocaleDateString('sv-SE'),
                                trailer_video_url: row.trailer_video_url || '',
                                poster_url: row.poster_url || '',
                                description: row.description,
                                sub_title: row.sub_title,
                                age_type: row.age_type,
                                type: row.type,
                                is_active: row.is_active == 1 ? 'true': 'false',
                                category: category
                            };
                            console.log("Formatted data:", formattedData);
                            try {
                                await dataProvider.create('movies', { data: formattedData });
                                notify('Import successful', { type: 'success' });
                            } catch (error) {
                                notify('Import failed', { type: 'warning' });
                            }
                        }
                        refresh();
                    },
                });
            }
        };
        reader.readAsText(file);
    };

    return (
        <Button
            component="label"
            startIcon={<PublishRoundedIcon />}
            size={isSmall ? "large" : "small"}

            sx={{
                paddingY: '0.21rem',
                ...(isSmall && { border: 'none', minWidth: 'auto', paddingY : '0.9rem' }),
            }}
        >
            {!isSmall && 'Import'}
            <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleFileUpload}
            />
        </Button>
    );
};

export default ImportButton;