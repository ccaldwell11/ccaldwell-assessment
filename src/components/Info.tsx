import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

interface InfoProps {
  parcelInfo?: {
    SITEADDRESS: string;
    OWNERNME1: string;
    ASS_DIMS: string;
    ASS_SQFT: string;
    PRPRTYDSCRP: string;
  } | null;
}

const Info: React.FC<InfoProps> = ({ parcelInfo }) => {
  if (!parcelInfo) {
    return <Heading>No parcel info available</Heading>;
  }

  return (
    <Box
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      border={'1px solid'}
      borderColor={'gray.300'}
      borderRadius={'md'}
      p={6}
      height={'100%'}
      textAlign={'center'}
    >
      <p>
        <strong>Full Address:</strong> {parcelInfo.SITEADDRESS}
      </p>
      <p>
        <strong>Owner:</strong> {parcelInfo.OWNERNME1}
      </p>
      <p>
        <strong>Dimensions:</strong> {parcelInfo.ASS_DIMS}
      </p>
      <p>
        <strong>Area:</strong> {parcelInfo.ASS_SQFT}
      </p>
      <p>
        <strong>Description:</strong> {parcelInfo.PRPRTYDSCRP}
      </p>
    </Box>
  );
};

export default Info;
