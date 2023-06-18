import { Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import { format } from 'date-fns';
import { useState } from 'react';

export const CardArticle = ({ image, title, dateCreated, dateUpdated, body }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{ backgroundColor: 'primary.main', height: '100%' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardHeader
        sx={{ color: 'white' }}
        title={title}
        subheader={
          <Typography
            variant="caption"
            component={'p'}
            mt={'12px'}
            color={'white'}
            sx={{ opacity: isHovered ? '1' : '0.8', transition: 'all 0.3s' }}
            lineHeight={'1.2'}
          >
            Created: {format(new Date(dateCreated), 'dd/MM//yyyy hh:mm:ss a')}
            <br />
            Updated: ${format(new Date(dateUpdated), 'dd/MM//yyyy hh:mm:ss a')}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: '240px', opacity: isHovered ? '1' : '0.85', transition: 'all 0.3s' }}
        image={image}
        title={title}
      />
      <CardContent>
        <Typography
          variant="body2"
          color={'white'}
          sx={{
            overflow: 'hidden',
            opacity: isHovered ? '1' : '0.8',
            transition: 'all 0.3s',
            display: '-webkit-box',
            '-webkit-box-orient': 'vertical',
            '-webkit-line-clamp': '5',
            maxHeight: '100px',
          }}
        >
          {body}
        </Typography>
      </CardContent>
    </Card>
  );
};
