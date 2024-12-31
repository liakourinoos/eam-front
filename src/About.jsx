import { useState, useEffect } from 'react';
import Footer from './generic components/Footer.jsx';
import Header from './generic components/Header.jsx';
import './App.css';
import { useAuth } from './customHooks.jsx';
import { RenderHeaderNavbar } from '../global_assets/global_functions.jsx';
function App() {
  const { userData,loading } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  // Show the button when the user scrolls down
  const handleScroll = () => {
    if (window.scrollY > 200) { // Adjust this value as needed
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Scroll to the top when the button is clicked
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling
    });
  };

  useEffect(() => {
    // Listen to the scroll event
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if(loading)
    return(
      <div className='w-full h-screen flex justify-center items-center bg-white'> 
        <span className='loading loading-lg'></span>
      </div>
    )

  if(!loading )
    return (
      <div className='w-full h-screen flex flex-col justify-between bg-white'>
          {RenderHeaderNavbar(userData,0)}
          {/* main page */}
          <div className="w-full  flex-grow relative bg-white">
              <p className='ml-32 text-3xl font-bold mt-10 mb-2'>Εγχειρίδιο Χρήσης</p>
              <div className='w-1/3 border-2 border-black ml-32 py-2 pl-3 flex flex-col gap-2 text-lg font-medium bg-white'>
                  <p className='underline text-2xl'>Περιεχόμενα</p>
                  <a href="#section1" className="hover:text-purple-500">1. Εισαγωγή</a>
      <a href="#section2" className="hover:text-purple-500">2. Δημιουργία Λογαριασμού/ Είσοδος στην υπηρεσία</a>
      <a href="#section3" className="hover:text-purple-500">3. Προφίλ Γονέα</a>
      <a href="#section4" className="hover:text-purple-500">4. Προφίλ Επαγγελματία</a>
      <a href="#section5" className="hover:text-purple-500">5. Ιστορικό</a>
      <a href="#section6" className="hover:text-purple-500">6. Συμφωνία</a>
      <a href="#section7" className="hover:text-purple-500">7. Πληρωμές</a>
      <a href="#section8" className="hover:text-purple-500">8. Αποσύνδεση</a>

              </div>

              <p id="section1" className='px-20 mt-10'>
                  <p className='font-semibold text-xl mb-2'>1. Εισαγωγή</p>
                  <p >Το nanika είναι ίσως η καλύτερη πλατφόρμα που συνδέει γονείς που αναζητούν φροντίδα για τα παιδιά τους με επαγγελματίες που ψάχνουν δουλειά.
                  Ως αρχική σελίδα παρουσιάζεται η σελίδα αναζήτησης επαγγελματία, όπου μπορείτε ως γονέας χωρίς να συνδεθείτε στην υπηρεσία, να ελέγξετε 
                  την διαθεσιμότητα νταντάδων που αντιστοιχεί στα φίλτρα που επιλέξατε.</p>

                  <p className='mt-5'><span className=' font-semibold'>Ως γονέας,</span> στο nanika θα βρείτε επαγγελματίες με αξιολογήσεις για να κρίνετε 
                  τον κατάλληλο για τις ανάγκες σας. Μόλις βρείτε έναν επαγγελματία που σας έκανε καλή εντύπωση, μπορείτε να στείλετε αίτημα επικοινωνίας (απαιτεί είσοδο), 
                  ώστε να μοιραστείτε μαζί του τα απαραίτητα στοιχεία για να επικοινωνήσει μαζί σας αν και αυτός ενδιαφέρεται.</p>

                  <p className='mt-5'><span className=' font-semibold'>Ως επαγγελματίας,</span> μπορείτε να δημοσιεύσετε την αγγελία σας για να βρείτε εργασία και να δεχτείτε αιτήματα επικοινωνίας από γονείς που ενδιαφέρονται.</p>

                  <p className='mt-5'> Για να συνεχίσετε ως επαγγελματίας πρέπει να κάνετε αντίστοιχη εγγραφή/είσοδο πατώντας το <span className=' font-semibold'>sign up/ login.</span></p>
              </p>

              <p id="section2" className='px-20 mt-10'>
                  <p className='font-semibold text-xl mb-2'> 2. Δημιουργία Λογαριασμού/ Είσοδος στην υπηρεσία</p>
                

                  <p>Με την επιλογή <span className='font-medium'>Sign Up</span> κατευθύνεστε σε ιστοσελίδα για να επιλέξετε αν ο λογαριασμός σας αντιστοιχεί σε επαγγελματία ή γονέα. Η δημιουργία λογαριασμού θα απαιτήσει να συμπληρώσετε πεδία όπως email,κωδικό και στη συνέχεια μέσω εισόδου από την σελίδα του gov.gr αποκτούνται τα προσωπικά στοιχεία σας (Ονοματεπώνυμο, ΑΜΚΑ,φύλο).</p>
                  
                  <p className='mt-5'>Με την επιλογή <span className='font-medium'>Login</span> κατευθύνεστε σε ιστοσελίδα για να συμπληρώσετε το email σας και τον κωδικό που εισάγατε κατά την εγγραφή σας στην υπηρεσία.</p>

              </p>

              <p id="section3" className='px-20 mt-10'>
                  <p className='font-semibold text-xl mb-2'>3. Προφίλ Γονέα</p>
                  <p>Μπορείτε να επεξεργαστείτε το προφίλ σας επιλέγοντας <span className='font-medium'>“Ρυθμίσεις Λογαριασμού”</span>, οι οποίες βρίσκονται στο δεξί μέρος του header, πατώντας το βέλος.</p>
                  <p>Πατώντας στο όνομα ή την φωτογραφία σας, μπορείτε να επισκεπτείτε το προφίλ σας, το οποίο θα γίνεται ορατό σε επαγγελματίες στους οποίους στέλνετε αίτημα επικοινωνίας αλλά και σε άλλους γονείς που διαβάζουν αξιολογήσεις που αφήνετε για κάποιον επαγγελματία με τον οποίο επιβεβαιωμένα συνεηργαστήκατε.</p>
              </p>

  <p id="section4"className='px-20 mt-10'>
      <p className='font-semibold text-xl mb-2'>4. Προφίλ Επαγγελματία</p>
      <p className=''>Μπορείτε να επεξεργαστείτε το προφίλ σας πατώντας <span className='font-medium'>“Ρυθμίσεις Λογαριασμού”</span>. Εκεί μετά την εγγραφή σας μπορείτε να προσθέσετε μια φωτογραφία σας, καθώς και μια σύντομη περιγραφή.</p>
      <p>Αφότου συνδεθείτε επιλέγοντας <span className='font-medium'>Αγγελίες, Ειδοποιήσεις, Αξιολογήσεις</span> μπορείτε να δείτε τις τρέχουσες φόρμες, τις μη οριστικοποιημένες αγγελίες σας και την επεξεργασία τους.</p>
      <p>Ένα πλήρως συμπληρωμένο προφίλ κερδίζει περισσότερη προσοχή από τους γονείς, καθώς δείχνει ότι είστε οργανωμένοι και αξιόπιστοι. Μην ξεχάσετε να προσθέσετε τις υπηρεσίες που προσφέρετε και να διατηρείτε το ημερολόγιό σας ενημερωμένο, ώστε να διευκολύνετε τους γονείς στην επιλογή τους.</p>
  </p>

  <p id="section5" className='px-20 mt-10'>
      <p className='font-semibold text-xl mb-2'>5. Ιστορικό</p>
      <p>Για τους γονείς με την επιλογή Ιστορικό, δίνεται η δυνατότητα προεπισκόπισης παλαιότερων αιτήσεων, πληρωμών, αξιολογήσεων και επαγγελματιών με τους οποίους έχετε έρθει σε επικοινωνία.</p>
      <p>Για τους επαγγελματίες με την επιλογή Ιστορικό, δίνεται η δυνατότητα προεπισκόπισης παλιότερων αγγελιών, συμφωνητικών, πληρωμών και τα στοιχεία των γονέων με τους οποίους έχετε έρθει σε επικοινωνία.</p>
      <p>Αυτό σας βοηθά να έχετε πλήρη εικόνα των συναλλαγών σας και να βρίσκετε εύκολα ό,τι χρειάζεστε.</p>
  </p>

  <p id="section6" className='px-20 mt-10'>
      <p className='font-semibold text-xl mb-2'>6. Συμφωνία</p>
      <p>Εφόσον έγινε επικοινωνία με τον επαγγελματία, ως γονέας πρέπει να στείλετε αίτηση απασχόλησης στην οποία θα είναι ξεκάθαρη η σύμβαση ωρών, χρονικής περιόδου και μέρους. Περιμένετε την αποδοχή από τον επαγγελματία σαν υπογραφή του στην συμφωνία σας και η πρόσληψη ολοκληρώθηκε!</p>
      <p>Ως επαγγελματίας, μετά την επικοινωνία, περιμένετε την αίτηση απασχόλησης, επιβεβαιώστε πως είναι όπως συμφωνήσατε και η πρόσληψη σας ολοκληρώθηκε!</p>
  </p>

  <p id="section7" className='px-20 mt-10'>
      <p className='font-semibold text-xl mb-2'>7. Πληρωμές</p>
      <p>Η πληρωμή γίνεται μέσω της παροχής κωδικού voucher από τον γονέα στον επαγγελματία. Στην συνέχεια ο επαγγελματίας ωφείλει να επιβεβαιώσει την παραλαβή του voucher, πατώντας “αποδοχή” στην ειδοποίηση.</p>
  </p>

  <p id="section8" className='px-20 mt-10 mb-10'>
      <p className='font-semibold text-xl mb-2'>8. Αποσύνδεση</p>
      <p>Αφού έχετε συνδεθεί στην υπηρεσία μας μπορείτε να αποσυνδεθείτε πατώντας στο βέλος δίπλα από το προφίλ σας και στην συνέχεια Αποσύνδεση.</p>
  </p>

    






          </div>

          {/* Scroll to top button */}
          {isVisible && (
              <button
              onClick={scrollToTop}
              className="fixed bottom-20 right-8 p-4 bg-blue-500 text-white size-16 flex items-center justify-center text-2xl font-semibold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 z-50"
              >
                  ↑
              </button>
          )}
          <Footer />
      </div>
    );
}

export default App;
