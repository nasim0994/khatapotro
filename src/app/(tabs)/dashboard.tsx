import AppBackground from "@/components/AppBackground";
import CategorySlider from "@/components/CategorySlider";
import DashboardCard from "@/components/modules/dashboard/Card";
import TransactionsList from "@/components/modules/dashboard/TransactionsList";
import { useGetAllTransactionQuery } from "@/redux/features/transactionApi";
import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Dashboard() {
  const { loggedUser } = useAppSelector((state: any) => state.auth);

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const currentYearMonth = `${year} ${month}`;

  const [yearNumber, monthNumber] = currentYearMonth.split(" ").map(Number);
  const startDateObj = new Date(Date.UTC(yearNumber, monthNumber - 1, 1));
  const endDateObj = new Date(Date.UTC(yearNumber, monthNumber, 0));

  const startDate = startDateObj.toISOString();
  const endDate = endDateObj.toISOString();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data } = useGetAllTransactionQuery({
    user: loggedUser?._id,
    startDate,
    endDate,
    category: selectedCategory,
  });
  const transactions = data?.data || [];

  return (
    <AppBackground>
      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ padding: 10 }}>
            {/* card */}
            <DashboardCard />

            <CategorySlider
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* transactions */}
            {transactions?.length > 0 && (
              <TransactionsList transactions={transactions} />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </AppBackground>
  );
}
