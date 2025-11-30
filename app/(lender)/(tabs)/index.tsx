import Box from '@/components/Box';
import Text from '@/components/Text';
import LoanRequestBidCard from '@/components/ui/LoanRequestBidCard/LoanRequestBidCard';
import { mockLoanRequests } from '@/data/mockLoanRequests';
import { useRouter } from 'expo-router';
import { ScrollView, TouchableOpacity } from 'react-native';

export default function LenderMarketplaceScreen() {
  const router = useRouter();

  const handlePlaceBid = (loanRequestId: string) => {
    router.push({
      pathname: '/(lender)/marketplace/loan-offer',
      params: { loanRequestId },
    });
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
      <Box flex={1} padding="l" backgroundColor="mainBackground">
        {/* Header */}
        <Box marginTop="xl" marginBottom="l">
          <Text
            variant="header"
            style={{
              fontSize: 28,
              fontFamily: 'PlusJakartaSans-Bold',
            }}
          >
            Marketplace
          </Text>
          <Text
            variant="body"
            marginTop="s"
            style={{
              fontFamily: 'PlusJakartaSans-Regular',
              color: '#667bab',
            }}
          >
            Explora solicitudes de préstamo
          </Text>
        </Box>

        {/* Loan Requests List */}
        <Box gap="m" marginBottom="l">
          {mockLoanRequests.map((loanRequest) => (
            <TouchableOpacity
              key={loanRequest.id}
              activeOpacity={0.7}
              onPress={() => handlePlaceBid(loanRequest.id)}
            >
              <LoanRequestBidCard
                amountRequested={loanRequest.amountRequested}
                loanReason={loanRequest.loanReason}
                userScore={loanRequest.userScore}
                numberOfPayments={loanRequest.numberOfPayments}
                onPlaceBid={() => handlePlaceBid(loanRequest.id)}
              />
            </TouchableOpacity>
          ))}
        </Box>
      </Box>
    </ScrollView>
  );
}
