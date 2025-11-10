import { getStreakService } from '../get-streak.service';
import { repositoryService } from '@/shared/services/repository';
import { Collection } from '@/infra/repository';
import { Streak } from '../../../streak.model';

describe('getStreakService', () => {
  const streaksRepository = repositoryService.collection<Streak>(Collection.STREAKS);

  beforeEach(() => {
    jest.clearAllMocks();
    streaksRepository.setMock?.([]);
  });

  it('should return empty streak data when no streaks exist', async () => {
    streaksRepository.setMock?.([]);

    const result = await getStreakService('habit-1');

    expect(result).toEqual({
      habitId: 'habit-1',
      currentStreak: 0,
      longestStreak: 0,
      completedDates: [],
      isActiveToday: false,
    });
  });

  it('should calculate current streak correctly for consecutive days ending today', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: twoDaysAgo.toISOString() },
      { id: '2', habitId: 'habit-1', createdAt: yesterday.toISOString() },
      { id: '3', habitId: 'habit-1', createdAt: today.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
    expect(result.isActiveToday).toBe(true);
    expect(result.completedDates).toHaveLength(3);
  });

  it('should calculate current streak correctly for consecutive days ending yesterday', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: twoDaysAgo.toISOString() },
      { id: '2', habitId: 'habit-1', createdAt: yesterday.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.isActiveToday).toBe(false);
  });

  it('should return 0 current streak when last completion was more than 1 day ago', async () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(fourDaysAgo.getDate() - 4);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: fourDaysAgo.toISOString() },
      { id: '2', habitId: 'habit-1', createdAt: threeDaysAgo.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(0);
    expect(result.longestStreak).toBe(2);
    expect(result.isActiveToday).toBe(false);
  });

  it('should calculate longest streak correctly with gaps in data', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(today.getDate() - 7);
    const eightDaysAgo = new Date();
    eightDaysAgo.setDate(today.getDate() - 8);
    const nineDaysAgo = new Date();
    nineDaysAgo.setDate(today.getDate() - 9);
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(today.getDate() - 10);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: tenDaysAgo.toISOString() },
      { id: '2', habitId: 'habit-1', createdAt: nineDaysAgo.toISOString() },
      { id: '3', habitId: 'habit-1', createdAt: eightDaysAgo.toISOString() },
      { id: '4', habitId: 'habit-1', createdAt: sevenDaysAgo.toISOString() },
      { id: '5', habitId: 'habit-1', createdAt: yesterday.toISOString() },
      { id: '6', habitId: 'habit-1', createdAt: today.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(2); // hoje e ontem
    expect(result.longestStreak).toBe(4); // 7-10 dias atrás
    expect(result.isActiveToday).toBe(true);
  });

  it('should remove duplicate entries for the same day', async () => {
    const today = new Date();
    const todayMorning = new Date(today);
    todayMorning.setHours(9, 0, 0, 0);
    const todayEvening = new Date(today);
    todayEvening.setHours(21, 0, 0, 0);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: todayMorning.toISOString() },
      { id: '2', habitId: 'habit-1', createdAt: todayEvening.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.completedDates).toHaveLength(1);
    expect(result.isActiveToday).toBe(true);
  });

  it('should handle streaks with missing createdAt', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1' }, // sem createdAt
      { id: '2', habitId: 'habit-1', createdAt: yesterday.toISOString() },
      { id: '3', habitId: 'habit-1', createdAt: today.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.completedDates).toHaveLength(2);
    expect(result.isActiveToday).toBe(true);
  });

  it('should handle single day streak', async () => {
    const today = new Date();

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: today.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.completedDates).toHaveLength(1);
    expect(result.isActiveToday).toBe(true);
  });

  it('should sort dates correctly regardless of input order', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate() - 2);

    // Datas fora de ordem
    const streaks: Streak[] = [
      { id: '2', habitId: 'habit-1', createdAt: today.toISOString() },
      { id: '1', habitId: 'habit-1', createdAt: twoDaysAgo.toISOString() },
      { id: '3', habitId: 'habit-1', createdAt: yesterday.toISOString() },
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(3);
    expect(result.longestStreak).toBe(3);
    expect(result.completedDates).toHaveLength(3);
    expect(result.isActiveToday).toBe(true);
  });

  it('should filter streaks by habitId correctly', async () => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    const streaks: Streak[] = [
      { id: '1', habitId: 'habit-1', createdAt: yesterday.toISOString() },
      { id: '2', habitId: 'habit-1', createdAt: today.toISOString() },
      { id: '3', habitId: 'habit-2', createdAt: today.toISOString() }, // different habit
    ];

    streaksRepository.setMock?.(streaks);

    const result = await getStreakService('habit-1');

    expect(result.currentStreak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.completedDates).toHaveLength(2);
    expect(result.isActiveToday).toBe(true);
  });
});