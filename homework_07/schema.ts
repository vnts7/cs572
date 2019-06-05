
interface Book {
  ISBN: string,
  authors: string[],
  keyworks: string[],
  borrowed: [
    {
      studentId: string,
      studentContact: string,
      returnDate: Date,
    }
  ]
}
