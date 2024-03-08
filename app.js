document.addEventListener('DOMContentLoaded', function() {
    const cells = document.querySelectorAll('.box');
    let currentPlayer = 'X';
    function togglePlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
    function handleCellClick() {
        if (this.textContent === '') {
            this.textContent = currentPlayer;
            this.style.color = '#FAB201'; 
            if (findWinner()) {
                const winner = findWinner();
                document.getElementById('message').textContent = `'${winner}' Won the game!`;
                document.getElementById('result').style.visibility = 'visible';
            } else if (findDraw()) {
                document.getElementById('message').textContent = 'It\'s a Draw!';
                document.getElementById('result').style.visibility = 'visible';
            } else {
                togglePlayer();
            }
        }
    }
    function findWinner() {
        const winConditions = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],  [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] ];
        for (let condition of winConditions) {
            const [a, b, c] = condition;
            if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                return cells[a].textContent;
            }
        }
         return null;
    }
    function findDraw() {
        return [...cells].every(cell => cell.textContent !== '');
    }
    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    function resetGame() {
        cells.forEach(cell => {
            cell.textContent = '';
            cell.style.color = 'white'; 
        });
        document.getElementById('message').textContent = '';
        document.getElementById('result').style.visibility = 'hidden';
    }
    document.getElementById('button').addEventListener('click', resetGame);
});
