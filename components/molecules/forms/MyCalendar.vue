<!-- components/molecules/forms/MyCalendar.vue -->
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CalendarDate } from '@internationalized/date'

// Props: expecting an ISO string (YYYY-MM-DD) as modelValue.
const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['update:modelValue'])

// Helper: Convert an ISO string (YYYY-MM-DD) to a Date object.
function isoToDate(iso: string): Date {
  return new Date(iso + 'T00:00:00')
}

// Helper: Format a Date object as an ISO date string (YYYY-MM-DD).
function dateToIso(date: Date): string {
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  return `${year}-${month}-${day}`
}

// Internal state: the selected date as a Date object.
const selectedDate = ref<Date>(isoToDate(props.modelValue))
// Internal state: the current month being displayed.
const currentMonth = ref(new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1))

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal) {
      selectedDate.value = isoToDate(newVal)
      currentMonth.value = new Date(selectedDate.value.getFullYear(), selectedDate.value.getMonth(), 1)
    }
  }
)

interface CalendarDay {
  date: Date
  isCurrentMonth: boolean
  isSelected: boolean
}

const calendarDays = computed((): CalendarDay[] => {
  const year = currentMonth.value.getFullYear()
  const month = currentMonth.value.getMonth()
  const firstDayOfMonth = new Date(year, month, 1)
  const startDayOfWeek = firstDayOfMonth.getDay() // 0 = Sunday

  const startDate = new Date(firstDayOfMonth)
  startDate.setDate(firstDayOfMonth.getDate() - startDayOfWeek)

  const days: CalendarDay[] = []
  // Create 42 days (6 weeks) grid.
  for (let i = 0; i < 42; i++) {
    const dayDate = new Date(startDate)
    dayDate.setDate(startDate.getDate() + i)
    days.push({
      date: dayDate,
      isCurrentMonth: dayDate.getMonth() === month,
      isSelected: dayDate.toDateString() === selectedDate.value.toDateString(),
    })
  }
  return days
})

// Navigation functions to change the displayed month.
function prevMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() - 1, 1)
}
function nextMonth() {
  currentMonth.value = new Date(currentMonth.value.getFullYear(), currentMonth.value.getMonth() + 1, 1)
}

// When a day is clicked, update selectedDate and emit the ISO string.
function selectDay(day: CalendarDay) {
  selectedDate.value = day.date
  emit('update:modelValue', dateToIso(selectedDate.value))
}
</script>

<template>
  <div class="my-calendar">
    <div class="header">
      <!-- Replace buttons with chevron icons (assumed globally registered) -->
      <ChevronDoubleLeftIcon @click="prevMonth" class="icon" />
      <span>
        {{ currentMonth.toLocaleDateString(undefined, { month: 'long', year: 'numeric' }) }}
      </span>
      <ChevronDoubleRightIcon @click="nextMonth" class="icon" />
    </div>
    <div class="weekdays">
      <span v-for="day in ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']" :key="day">
        {{ day }}
      </span>
    </div>
    <div class="days-grid">
      <div
        v-for="day in calendarDays"
        :key="day.date.toISOString()"
        :class="['day', { 'current-month': day.isCurrentMonth, selected: day.isSelected }]"
        @click="selectDay(day)"
      >
        {{ day.date.getDate() }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.my-calendar {
  width: 300px;
  border: 1px solid var(--border);
  border-radius: var(--radius-s);
  box-shadow: var(--shadow-xs);
  padding: var(--spacing-s);
  font-family: sans-serif;
  background-color: var(--background);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-xs);
  color: var(--text-primary);
}

.weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--spacing-xs);
  color: var(--text-secondary);
}

.days-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  text-align: center;
}

.day {
  padding: var(--spacing-xs);
  cursor: pointer;
  border: 1px solid transparent;
}

.day.current-month {
  color: var(--text-primary);
}

.day:not(.current-month) {
  color: var(--text-secondary);
}

.day.selected {
  background-color: var(--primary);
  color: var(--background-strong);
  border-radius: var(--radius-full);
}

.day:hover {
  background-color: var(--hover);
}


</style>
