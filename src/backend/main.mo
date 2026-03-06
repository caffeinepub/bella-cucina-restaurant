import List "mo:core/List";
import Migration "migration";

(with migration = Migration.run)
actor {
  type Booking = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    serviceType : Text;
    message : Text;
  };

  type ContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  let bookings = List.empty<Booking>();
  let contactMessages = List.empty<ContactMessage>();

  public shared ({ caller }) func submitBooking(
    name : Text,
    email : Text,
    phone : Text,
    preferredDate : Text,
    serviceType : Text,
    message : Text,
  ) : async () {
    let newBooking : Booking = {
      name;
      email;
      phone;
      preferredDate;
      serviceType;
      message;
    };
    bookings.add(newBooking);
  };

  public query ({ caller }) func getBookings() : async [Booking] {
    bookings.toArray();
  };

  public shared ({ caller }) func submitContactMessage(name : Text, email : Text, phone : Text, message : Text) : async () {
    let newMessage : ContactMessage = {
      name;
      email;
      phone;
      message;
    };
    contactMessages.add(newMessage);
  };

  public query ({ caller }) func getContactMessages() : async [ContactMessage] {
    contactMessages.toArray();
  };
};
