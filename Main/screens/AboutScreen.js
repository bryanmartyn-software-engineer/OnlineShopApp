import React, { useContext } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { ShopContext } from '../context/ShopContext';

export default function AboutScreen({ navigation }) {
  const { darkMode } = useContext(ShopContext);

  const missionPoints = [
    {
      icon: 'public',
      title: 'Global Reach',
      description: 'Serving customers in over 150 countries worldwide',
    },
    {
      icon: 'trending-up',
      title: 'Innovation',
      description: 'Constantly evolving to provide the best shopping experience',
    },
    {
      icon: 'favorite',
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
    },
    {
      icon: 'eco',
      title: 'Sustainability',
      description: 'Committed to eco-friendly and sustainable practices',
    },
  ];

  const teamMembers = [
    {
      name: 'Sam Lim',
      role: 'Founder & CEO',
      expertise: 'Business Strategy',
      icon: 'person',
    },
    {
      name: 'Sarah Smith',
      role: 'Head of Products',
      expertise: 'Product Management',
      icon: 'person',
    },
    {
      name: 'Nick Lee',
      role: 'CTO',
      expertise: 'Technology',
      icon: 'person',
    },
    {
      name: 'Jason Tan',
      role: 'Customer Success',
      expertise: 'Support & Relations',
      icon: 'person',
    },
  ];

  const contactMethods = [
    {
      icon: 'email',
      label: 'Email',
      value: 'support@shophub.com',
      action: () => Linking.openURL('mailto:support@shophub.com'),
    },
    {
      icon: 'phone',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      action: () => Linking.openURL('tel:+15551234567'),
    },
    {
      icon: 'location-on',
      label: 'Address',
      value: '123 Commerce Street, New York, NY 10001',
      action: () => {},
    },
    {
      icon: 'schedule',
      label: 'Working Hours',
      value: '24/7 Customer Support',
      action: () => {},
    },
  ];

  const socialLinks = [
    {
      icon: 'facebook',
      label: 'Facebook',
      url: 'https://facebook.com/shophub',
      color: '#1877F2',
    },
    {
      icon: 'language',
      label: 'Twitter',
      url: 'https://twitter.com/shophub',
      color: '#1DA1F2',
    },
    {
      icon: 'camera-alt',
      label: 'Instagram',
      url: 'https://instagram.com/shophub',
      color: '#E4405F',
    },
    {
      icon: 'linked-camera',
      label: 'LinkedIn',
      url: 'https://linkedin.com/company/shophub',
      color: '#0A66C2',
    },
  ];

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.darkContainer]}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={[styles.headerContainer, darkMode && styles.darkHeaderContainer]}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name="arrow-back" size={24} color={darkMode ? '#ecf0f1' : '#2c3e50'} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, darkMode && styles.darkText]}>About Us</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Company Overview */}
        <View style={[styles.section, darkMode && styles.darkSection]}>
          <View style={styles.logoContainer}>
            <MaterialIcons name="shopping-bag" size={64} color="#6C63FF" />
          </View>
          <Text style={[styles.companyName, darkMode && styles.darkText]}>
            ShopHub
          </Text>
          <Text style={[styles.companyTagline, darkMode && styles.darkSubText]}>
            Your Trusted Online Marketplace
          </Text>
          <Text style={[styles.description, darkMode && styles.darkSubText]}>
            Since 2015, ShopHub has been revolutionizing the way people shop online. We believe 
            in providing quality products at affordable prices with exceptional customer service.
          </Text>
        </View>

        {/* Mission & Vision */}
        <View style={styles.missionContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Our Mission
          </Text>
          <Text style={[styles.missionStatement, darkMode && styles.darkSubText]}>
            "To make online shopping accessible, affordable, and enjoyable for everyone, 
            while maintaining the highest standards of quality and customer service."
          </Text>
        </View>

        {/* Core Values */}
        <View style={styles.valuesContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Our Values
          </Text>
          <View style={styles.valuesGrid}>
            {missionPoints.map((point, index) => (
              <View 
                key={index}
                style={[styles.valueCard, darkMode && styles.darkCard]}
              >
                <View style={styles.valueIconContainer}>
                  <MaterialIcons 
                    name={point.icon} 
                    size={32} 
                    color="#6C63FF" 
                  />
                </View>
                <Text style={[styles.valueTitle, darkMode && styles.darkText]}>
                  {point.title}
                </Text>
                <Text style={[styles.valueDescription, darkMode && styles.darkSubText]}>
                  {point.description}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Team Section */}
        <View style={styles.teamContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Meet Our Team
          </Text>
          <Text style={[styles.teamSubtitle, darkMode && styles.darkSubText]}>
            Passionate professionals dedicated to your satisfaction
          </Text>
          <View style={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <View 
                key={index}
                style={[styles.teamCard, darkMode && styles.darkCard]}
              >
                <View style={styles.avatarContainer}>
                  <MaterialIcons 
                    name={member.icon} 
                    size={48} 
                    color="#fff" 
                  />
                </View>
                <Text style={[styles.memberName, darkMode && styles.darkText]}>
                  {member.name}
                </Text>
                <Text style={[styles.memberRole, darkMode && styles.darkSubText]}>
                  {member.role}
                </Text>
                <Text style={[styles.memberExpertise, darkMode && styles.darkSubText]}>
                  {member.expertise}
                </Text>
              </View>
            ))}
          </View>
        </View>

        {/* Contact Section */}
        <View style={styles.contactContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Get in Touch
          </Text>
          <View style={styles.contactGrid}>
            {contactMethods.map((method, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.contactCard, darkMode && styles.darkCard]}
                onPress={method.action}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name={method.icon} 
                  size={28} 
                  color="#6C63FF" 
                />
                <Text style={[styles.contactLabel, darkMode && styles.darkText]}>
                  {method.label}
                </Text>
                <Text 
                  style={[styles.contactValue, darkMode && styles.darkSubText]}
                  numberOfLines={2}
                >
                  {method.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Social Media */}
        <View style={styles.socialContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Follow Us
          </Text>
          <Text style={[styles.socialSubtitle, darkMode && styles.darkSubText]}>
            Connect with us on social media
          </Text>
          <View style={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.socialButton, { backgroundColor: `${link.color}15` }]}
                onPress={() => Linking.openURL(link.url)}
                activeOpacity={0.7}
              >
                <MaterialIcons 
                  name={link.icon} 
                  size={28} 
                  color={link.color} 
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* FAQ Section */}
        <View style={styles.faqContainer}>
          <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>
            Quick FAQ
          </Text>
          
          <View style={[styles.faqItem, darkMode && styles.darkCard]}>
            <Text style={[styles.faqQuestion, darkMode && styles.darkText]}>
              How can I track my order?
            </Text>
            <Text style={[styles.faqAnswer, darkMode && styles.darkSubText]}>
              You can track your order in the "Order History" section of your profile. 
              We'll also send you email updates at each step.
            </Text>
          </View>

          <View style={[styles.faqItem, darkMode && styles.darkCard]}>
            <Text style={[styles.faqQuestion, darkMode && styles.darkText]}>
              What is your return policy?
            </Text>
            <Text style={[styles.faqAnswer, darkMode && styles.darkSubText]}>
              We offer a 30-day return policy on all items. Items must be in original 
              condition with all packaging and documentation.
            </Text>
          </View>

          <View style={[styles.faqItem, darkMode && styles.darkCard]}>
            <Text style={[styles.faqQuestion, darkMode && styles.darkText]}>
              Do you offer international shipping?
            </Text>
            <Text style={[styles.faqAnswer, darkMode && styles.darkSubText]}>
              Yes! We ship to over 150 countries. Shipping costs and delivery times vary 
              by location.
            </Text>
          </View>

          <View style={[styles.faqItem, darkMode && styles.darkCard]}>
            <Text style={[styles.faqQuestion, darkMode && styles.darkText]}>
              Is my payment information secure?
            </Text>
            <Text style={[styles.faqAnswer, darkMode && styles.darkSubText]}>
              Absolutely! We use industry-standard SSL encryption and PCI-DSS compliance 
              to protect your data.
            </Text>
          </View>
        </View>

        {/* Footer CTA */}
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate('Home')}
            activeOpacity={0.8}
          >
            <Text style={styles.shopButtonText}>Continue Shopping</Text>
            <MaterialIcons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  scrollContent: {
    paddingBottom: 20,
  },

  // Header
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkHeaderContainer: {
    backgroundColor: '#1e1e1e',
    borderBottomColor: '#333',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2c3e50',
  },
  darkText: {
    color: '#ecf0f1',
  },
  darkSubText: {
    color: '#bdc3c7',
  },

  // Company Overview
  section: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 0,
  },
  darkSection: {
    backgroundColor: '#1e1e1e',
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  companyName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 4,
  },
  companyTagline: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    textAlign: 'center',
  },

  // Mission
  missionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  missionStatement: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 22,
    fontStyle: 'italic',
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: 'rgba(108, 99, 255, 0.05)',
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
    borderRadius: 8,
  },

  // Values
  valuesContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  valuesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  valueCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  darkCard: {
    backgroundColor: '#1e1e1e',
    shadowColor: '#000',
    shadowOpacity: 0.3,
  },
  valueIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  valueTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
    textAlign: 'center',
  },
  valueDescription: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    lineHeight: 16,
  },

  // Team
  teamContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  teamSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  teamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  teamCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  memberName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 4,
  },
  memberRole: {
    fontSize: 12,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 4,
  },
  memberExpertise: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },

  // Contact
  contactContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  contactGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  contactCard: {
    width: '48%',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  contactLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    marginTop: 8,
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
  },

  // Social
  socialContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  socialSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 16,
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    flexWrap: 'wrap',
  },
  socialButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // FAQ
  faqContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  faqItem: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 13,
    color: '#7f8c8d',
    lineHeight: 20,
  },

  // Footer
  footerContainer: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  shopButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  shopButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});